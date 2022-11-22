const Voting = artifacts.require("Voting");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("Voting", (accounts) => {
  const _owner = accounts[0];
  const _voter1 = accounts[1];
  const _voter2 = accounts[2];
  let votingInstance;
  let defaultProposalId;

  beforeEach(async function () {
    votingInstance = await Voting.new({
      from: _owner,
    });
    defaultProposalId = new BN(1);
  });

  describe("Voter", () => {
    describe("RegisteringVoters session", () => {
      it('should initialize VotingInstance with "RegisteringVoters" session started', async () => {
        let defaultWorkflowStatus = await votingInstance.workflowStatus.call();

        expect(defaultWorkflowStatus).to.be.bignumber.equal(new BN(0));
      });

      it('should revert when "RegisteringVoters" session is not started', async () => {
        await votingInstance.startProposalsRegistering();

        await expectRevert(
          votingInstance.addVoter(_voter1, {
            from: _owner,
          }),
          "Voters registration is not open yet"
        );
      });
    });

    describe("Add Voter", () => {
      it("should revert when not called by owner", async () => {
        await expectRevert(
          votingInstance.addVoter(_voter2, {
            from: _voter1,
          }),
          "Ownable: caller is not the owner"
        );
      });

      it("should revert when a voter has already been registered", async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });

        await expectRevert(
          votingInstance.addVoter(_voter1, {
            from: _owner,
          }),
          "Already registered"
        );
      });

      it('should emit a "VoterRegistered" on success', async () => {
        const result = await votingInstance.addVoter(_voter1, {
          from: _owner,
        });

        expectEvent(result, "VoterRegistered", {
          voterAddress: _voter1,
        });
      });
    });
  });

  describe("Proposal", () => {
    describe("ProposalsRegistrationStarted session", () => {
      it('should revert when previous session was not "RegisteringVoters"', async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        await expectRevert(
          votingInstance.startProposalsRegistering({
            from: _owner,
          }),
          "Registering proposals cant be started now"
        );
      });

      it('should revert when "ProposalsRegistrationStarted" session is not started', async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        await expectRevert(
          votingInstance.addProposal("One ring to rule them all !", {
            from: _voter1,
          }),
          "Proposals are not allowed yet"
        );
      });

      it('should have default "GENESIS" proposal when starting "ProposalsRegistrationStarted"', async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        const proposal = await votingInstance.getOneProposal(new BN(0), {
          from: _voter1,
        });

        assert.equal(proposal.description, "GENESIS");
        assert.equal(proposal.voteCount, new BN(0));
      });

      it('should emit a "WorkflowStatusChange" event on success', async () => {
        const previousWorkflowStatus =
          await votingInstance.workflowStatus.call();
        const status = await votingInstance.startProposalsRegistering({
          from: _owner,
        });

        const newWorkflowStatus = await votingInstance.workflowStatus.call();

        expectEvent(status, "WorkflowStatusChange", {
          previousStatus: previousWorkflowStatus,
          newStatus: newWorkflowStatus,
        });

        expect(newWorkflowStatus).to.be.bignumber.equal(new BN(1));
      });
    });

    describe("Add Proposal", () => {
      it("should revert when not called by voter", async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await expectRevert(
          votingInstance.addProposal("One ring to rule them all !", {
            from: _voter1,
          }),
          "You're not a voter"
        );
      });

      it("should revert when empty string is submit", async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await expectRevert(
          votingInstance.addProposal("", {
            from: _voter1,
          }),
          "Vous ne pouvez pas ne rien proposer"
        );
      });

      it('should emit a "ProposalRegistered" event for each successful proposal', async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });

        await votingInstance.startProposalsRegistering({
          from: _owner,
        });

        const resultProposal1 = await votingInstance.addProposal(
          "One ring to rule them all !",
          {
            from: _voter1,
          }
        );

        expectEvent(resultProposal1, "ProposalRegistered", 1);
      });
    });

    describe("EndProposalsRegistering session", () => {
      it('should revert when previous session was not "ProposalsRegistrationStarted"', async () => {
        await expectRevert(
          votingInstance.endProposalsRegistering({
            from: _owner,
          }),
          "Registering proposals havent started yet"
        );
      });

      it('should emit a "WorkflowStatusChange" event on success', async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        const previousWorkflowStatus =
          await votingInstance.workflowStatus.call();
        const status = await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        const newWorkflowStatus = await votingInstance.workflowStatus.call();

        expectEvent(status, "WorkflowStatusChange", {
          previousStatus: previousWorkflowStatus,
          newStatus: newWorkflowStatus,
        });

        expect(newWorkflowStatus).to.be.bignumber.equal(new BN(2));
      });
    });
  });

  describe("Voting", () => {
    describe("VotingSessionStarted session", () => {
      it('should revert when previous session was not "ProposalsRegistrationEnded"', async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });

        await expectRevert(
          votingInstance.startVotingSession({
            from: _owner,
          }),
          "Registering proposals phase is not finished"
        );
      });

      it('should revert when "VotingSessionStarted" is not called by owner', async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        await expectRevert(
          votingInstance.startVotingSession({
            from: _voter1,
          }),
          "Ownable: caller is not the owner"
        );
      });
    });

    describe("Set vote", () => {
      // Initializing default steps
      beforeEach(async function () {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });

        await votingInstance.addProposal("One ring to rule them all !", {
          from: _voter1,
        });

        await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        await votingInstance.startVotingSession({
          from: _owner,
        });
      });
      it("should revert when not called by a voter", async () => {
        await expectRevert(
          votingInstance.setVote(defaultProposalId, {
            from: _voter2,
          }),
          "You're not a voter"
        );
      });

      it("should revert when a voter has already voted", async () => {
        await votingInstance.setVote(defaultProposalId, {
          from: _voter1,
        });

        await expectRevert(
          votingInstance.setVote(defaultProposalId, {
            from: _voter1,
          }),
          "You have already voted"
        );
      });

      it("should revert when a proposal is not found", async () => {
        await expectRevert(
          votingInstance.setVote(new BN(666), {
            from: _voter1,
          }),
          "Proposal not found"
        );
      });

      it('should emit a "Voted" event on success', async () => {
        const result = await votingInstance.setVote(defaultProposalId, {
          from: _voter1,
        });

        expectEvent(result, "Voted", {
          voter: _voter1,
          proposalId: defaultProposalId,
        });
      });

      it("should increment a proposal voteCount on success", async () => {
        await votingInstance.setVote(defaultProposalId, {
          from: _voter1,
        });

        const result = await votingInstance.getOneProposal(defaultProposalId, {
          from: _voter1,
        });

        expect(result.voteCount).to.be.bignumber.equal(new BN(1));
      });
    });

    describe("EndVotingSession session", () => {
      it('should revert when previous session was not "VotingSessionStarted"', async () => {
        await expectRevert(
          votingInstance.endVotingSession({
            from: _owner,
          }),
          "Voting session havent started yet"
        );
      });

      it('should emit a "WorkflowStatusChange" event on success', async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        await votingInstance.startVotingSession({
          from: _owner,
        });
        const previousWorkflowStatus =
          await votingInstance.workflowStatus.call();
        const status = await votingInstance.endVotingSession({
          from: _owner,
        });
        const newWorkflowStatus = await votingInstance.workflowStatus.call();

        expectEvent(status, "WorkflowStatusChange", {
          previousStatus: previousWorkflowStatus,
          newStatus: newWorkflowStatus,
        });

        expect(newWorkflowStatus).to.be.bignumber.equal(new BN(4));
      });
    });
  });

  describe("Tally vote", () => {
    describe("VotesTallied session", () => {
      it('should revert when previous session was not "VotingSessionEnded"', async () => {
        await expectRevert(
          votingInstance.tallyVotes({
            from: _owner,
          }),
          "Current status is not voting session ended"
        );
      });

      it("should revert when not called by owner", async () => {
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        await votingInstance.startVotingSession({
          from: _owner,
        });
        await votingInstance.endVotingSession({
          from: _owner,
        });
        await expectRevert(
          votingInstance.tallyVotes({
            from: _voter1,
          }),
          "Ownable: caller is not the owner"
        );
      });
    });

    describe("Tally vote", () => {
      // Initializing default steps
      beforeEach(async function () {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        await votingInstance.addVoter(_voter2, {
          from: _owner,
        });

        await votingInstance.startProposalsRegistering({
          from: _owner,
        });
        await votingInstance.addProposal("One ring to rule them all !", {
          from: _voter1,
        });

        await votingInstance.endProposalsRegistering({
          from: _owner,
        });
        await votingInstance.startVotingSession({
          from: _owner,
        });

        await votingInstance.setVote(defaultProposalId, {
          from: _voter1,
        });
        await votingInstance.setVote(defaultProposalId, {
          from: _voter2,
        });
        await votingInstance.endVotingSession({
          from: _owner,
        });
      });

      it("should have winningProposalId equal to id 1", async () => {
        await votingInstance.tallyVotes();
        const winningProposalId = await votingInstance.winningProposalID.call();
        expect(winningProposalId).to.be.bignumber.equal(defaultProposalId);
      });

      it('should emit a "WorkflowStatusChange" when tally vote end', async () => {
        const previousStatus = await votingInstance.workflowStatus.call();

        const result = await votingInstance.tallyVotes();
        await expectEvent(result, "WorkflowStatusChange", {
          previousStatus: previousStatus,
          newStatus: new BN(5),
        });
      });
    });
  });

  describe("Getter", () => {
    describe("getVoter", () => {
      it("should revert when not call by a voter ", async () => {
        await expectRevert(
          votingInstance.getVoter(_voter1, {
            from: _voter1,
          }),
          "You're not a voter"
        );
      });

      it("should get a voter", async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        const voter = await votingInstance.getVoter(_voter1, {
          from: _voter1,
        });

        assert.equal(voter.isRegistered, true);
        assert.equal(voter.hasVoted, false);
        assert.equal(voter.votedProposalId, 0);
      });
    });

    describe("getOneProposal", () => {
      it("should revert when not call by a voter", async () => {
        await expectRevert(
          votingInstance.getOneProposal(_voter1, {
            from: _voter1,
          }),
          "You're not a voter"
        );
      });

      it("should get a proposal", async () => {
        await votingInstance.addVoter(_voter1, {
          from: _owner,
        });
        await votingInstance.startProposalsRegistering({
          from: _owner,
        });

        await votingInstance.addProposal("One ring to rule them all !", {
          from: _voter1,
        });

        const proposal = await votingInstance.getOneProposal(
          defaultProposalId,
          {
            from: _voter1,
          }
        );
        assert.equal(proposal.description, "One ring to rule them all !");
        assert.equal(proposal.voteCount, new BN(0));
      });
    });
  });
});

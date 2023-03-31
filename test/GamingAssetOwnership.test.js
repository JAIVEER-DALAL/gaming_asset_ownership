const { expect } = require("chai");

const GamingAssetOwnership = artifacts.require("GamingAssetOwnership");

contract("GamingAssetOwnership", (accounts) => {
  let gamingAssetOwnership;

  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  const GOLD = 0;
  const SILVER = 1;
  const BRONZE = 2;

  beforeEach(async () => {
    gamingAssetOwnership = await GamingAssetOwnership.new();
  });

  describe("mint", () => {
    it("should allow the owner to mint tokens", async () => {
      const amount = 100;
      const data = web3.utils.asciiToHex("test");

      await gamingAssetOwnership.mint(user1, GOLD, amount, data, { from: owner });

      const balance = await gamingAssetOwnership.balanceOf(user1, GOLD);
      expect(balance).to.equal(amount);
    });

    it("should not allow non-owners to mint tokens", async () => {
      const amount = 100;
      const data = web3.utils.asciiToHex("test");

      await expect(gamingAssetOwnership.mint(user1, GOLD, amount, data, { from: user1 })).to.be.rejectedWith(Error);
    });
  });

  describe("burn", () => {
    it("should allow the owner to burn tokens", async () => {
      const amount = 100;
      const data = web3.utils.asciiToHex("test");

      await gamingAssetOwnership.mint(user1, GOLD, amount, data, { from: owner });

      await gamingAssetOwnership.burn(user1, GOLD, amount, { from: owner });

      const balance = await gamingAssetOwnership.balanceOf(user1, GOLD);
      expect(balance).to.equal(0);
    });

    it("should allow the asset owner to burn tokens", async () => {
      const amount = 100;
      const data = web3.utils.asciiToHex("test");

      await gamingAssetOwnership.mint(user1, GOLD, amount, data, { from: owner });

      await gamingAssetOwnership.burn(user1, GOLD, amount, { from: user1 });

      const balance = await gamingAssetOwnership.balanceOf(user1, GOLD);
      expect(balance).to.equal(0);
    });

    it("should not allow non-owners to burn tokens", async () => {
      const amount = 100;
      const data = web3.utils.asciiToHex("test");

      await gamingAssetOwnership.mint(user1, GOLD, amount, data, { from: owner });

      await expect(gamingAssetOwnership.burn(user1, GOLD, amount, { from: user2 })).to.be.rejectedWith(Error);
    });
  });
});

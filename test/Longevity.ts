import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

describe("Longevity contract", () => {
    const DEFAULT_REWARD = 1
    const MSG_NOT_THE_OWNER = "Ownable: caller is not the owner"

    const deploy = async () => {
        const [ owner, otherAccount ] = await ethers.getSigners()

        const Longevity = await ethers.getContractFactory("LongevityToken");
        const longevity = await Longevity.deploy(DEFAULT_REWARD)

        return { longevity, owner, otherAccount }
    }

    describe("Deployment", () => {
        it("Deployed", async () => {
            const { longevity } = await loadFixture(deploy);

            expect(longevity.target).to.be.properAddress;
        })

        it("Has reward amount set to default", async () => {
            const { longevity } = await loadFixture(deploy);

            expect(await longevity.getRewardAmount()).eq(DEFAULT_REWARD)
        })

        it("Has right owner", async () => {
            const { longevity, owner } = await loadFixture(deploy);

            expect(await longevity.owner()).eq(owner.address)
        })
    })

    describe("Mint", () => {
        it("Owner can mint", async () => {
            const { longevity, owner } = await loadFixture(deploy);

            await longevity.mint(owner, 1)

            expect(await longevity.balanceOf(owner)).eq(1)
        })

        it("Not owner cannot mint", async () => {
            const { longevity, otherAccount } = await loadFixture(deploy);

            await expect(longevity.connect(otherAccount).mint(otherAccount, 1))
                .to.be.revertedWith(MSG_NOT_THE_OWNER)
        })
    })

    describe("Reward amount", () => {
        it("Only owner can read reward amount", async () => {
            const { longevity, otherAccount } = await loadFixture(deploy);

            expect(await longevity.getRewardAmount()).eq(DEFAULT_REWARD)
            await expect(longevity.connect(otherAccount).getRewardAmount())
                .to.be.revertedWith(MSG_NOT_THE_OWNER)
        })

        it("Only owner can set reward amount", async () => {
            const { longevity, otherAccount } = await loadFixture(deploy);

            expect(await longevity.getRewardAmount()).eq(DEFAULT_REWARD)

            await longevity.setRewardAmount(2)
            expect(await longevity.getRewardAmount()).eq(2)

            await expect(longevity.connect(otherAccount).setRewardAmount(3))
                .to.be.revertedWith(MSG_NOT_THE_OWNER)
        })
    })

    describe("Reward", () => {
        it("Not owner cannot grant reward", async () => {
            const { longevity, otherAccount } = await loadFixture(deploy);

            await expect(longevity.connect(otherAccount).grantReward(otherAccount))
                .to.be.revertedWith(MSG_NOT_THE_OWNER)
        })

        it("Owner must have tokens to grant a reward", async () => {
            const { longevity, owner, otherAccount } = await loadFixture(deploy);

            expect(await longevity.balanceOf(owner)).eq(0)
            await expect(longevity.grantReward(otherAccount))
                .to.be.revertedWith("ERC20: transfer amount exceeds balance")
        })

        it("Owner can grant reward", async () => {
            const { longevity, owner, otherAccount } = await loadFixture(deploy);

            await longevity.mint(owner, DEFAULT_REWARD)

            expect(await longevity.balanceOf(otherAccount))
                .eq(0)

            await longevity.grantReward(otherAccount)
            
            expect(await longevity.balanceOf(otherAccount))
                .eq(DEFAULT_REWARD)
        })
    })
})
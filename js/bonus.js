"Negative": {
            embedLayer: "neg",
            buttonStyle: {
                "width": "300px",
                "margin": "10px",
                "color": "#CB2821"
            }
        },



addLayer("negative", {
    name: "Negative",
    symbol: "neg",
    position: 2,
    startData() {return {
        unlocked: true,
        points: 0
    }},
    row: 1,
    color: "#CB2821",
    type: "custom",
    resource: "Negative points",
    baseResource: "Point gain",
    baseAmount() {return getPointGen() },
    requires: new Decimal(10),
    exponent: new Decimal(1e-100),
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    canReset() {return false},
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", 1],
                ["upgrade-tree", []]
            ],
            buttonStyle: {
                "color": "#CB2821"
            }
        }
    },
    infoboxes: {
        1: {
            title() {return "You have " + format(player.neg.points) + "n (Negative points) | +" + format(this.getResetGain) +  "/s"},
            body() {return `Welcome to Negative! You will (very) slowly gain negative points based on your point gain. Upgrades in this layer will boost negative point gain as well as other things though, so don't worry!`}
        },
        2: {
            title() {return "Your Negative Points are decreasing the base point gain by"}
        }
    },
    upgrades: {
    },
})
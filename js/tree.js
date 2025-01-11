var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})

addLayer("ex", {
    name: "examples", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ex", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Example points", // Name of prestige currency
    baseResource: "energy points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    upgrades: {
        11: {
            title: "Example",
            description: "Example",
            effect() {return null},
            effectDisplay() {return format("Tax")},
            cost: 1,
            unlocked() {return false},
            onPurchase() {},
            tooltip: "Example"
        }
    }, //contains one copyable upgrade.
    achievements: {
        11: {
            name: "Example",
            done() { return },
            tooltip: "Example",
            effect() {},
            unlocked() {},
            onComplete() {},
        }
    }, //contains one copyable achievement.
    infoboxes: {
        lore: {
            title: "Example",
            body() { return "Example" },
            unlocked() {},
        },
    }, //Contains one copyable infobox.
    milestones: {
        1: {
            requirementDescription: "Example",
            effectDescription: "Gives you an Example",
            done() {},
            onComplete() {},
            unlocked() {},
        },
    }, //Contains one copyable milestone.
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Example" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return },
            effect() { return },
            display() { return },
            purchaseLimit: {},
            tooltip: "Example"
        },
    }, //Contains one copyable buyable.
    //I would add a challenge but I am NOT doing allat (maybe later)
    layerShown(){return false},
    unlocked() {return false},
    tooltip() {return player[this.layer].points+" "+this.resource+` <br>
    Click to view`}
})

addLayer("main", {
    name: "main",
    symbol:"Main",
    position: 0,
    row: 1,
    color: "FFFFFF",
    type: "none",
    tooltip: "Play",
    
    tabFormat: {
        "Points": {
            embedLayer: "p"
        },
        "Prestige": {
            embedLayer: "pr",
            unlocked() {if (hasUpgrade('p',51) || hasMilestone('pr',1)) return true
            else return false},
            buttonStyle: {
                "color": "#287233"
            },
            glowColor: "#287233"
        },
        "Row 2": {
            content: [""],
            unlocked() {return false}
        },
        "Ascension": {
            content: ["main-display",
            "blank",],
            unlocked() {return false}
        },
        "Transcension": {
            content: ["main-display",
            "blank",],
            unlocked() {return false}
        },
        "Ultra": {
            content: ["main-display",
            "blank",],
            unlocked() {return false}
        },
        "Uber Prestige": {
            content: ["main-display",
            "blank",],
            unlocked() {return false}
        },
        "OMEGA": {
            content: ["main-display",
            "blank",],
            unlocked() {return false}
        }
    }
})

addLayer("p", {
    name: "p", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "p", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    resource: "Nothings i guess",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", 1],
                "blank",
                ["upgrade-tree", [[901], [13,12,11,14], [22,21], [32,31,33], [41,42], [51], [62,61,63]]]
            ],
            buttonStyle: {
                "width": "450px",
                "margin": "10px"
            }
        },
        "Negative": {
            embedLayer: "np",
            buttonStyle: {
                "width": "300px",
                "margin": "10px",
                "color": "#CB2821"
            },
            unlocked() {return (hasUpgrade('p',901) || player.np.points.gte(new Decimal(0.01)))}
        },
        "Testing": {
            content: [
                "clickables"
            ],
            buttonStyle: {
                "width": "450px",
                "margin": "10px"
            },
            unlocked() {return false}
        }
    },
    upgrades: {
        //Arranged in order of addition, not id! Remember that. It goes by upgrade number.
        11: {
            fullDisplay: `<h3>p1: The first</h3><br>
            Start off with a pretty big one!<br>
            3x Point gain<br>
            Cost: 10p`,
            canAfford() {return player.points.gte(10)},
            pay() {player.points = player.points.sub(10)},
        },
        21: {
            fullDisplay: `<h3>p2: The second</h3><br>
            Very original title, I know.<br>
            2x Point gain<br>
            Cost: 50p`,
            canAfford() {return player.points.gte(50)},
            pay() {player.points = player.points.sub(50)},
            unlocked() {return hasUpgrade(this.layer,11)},
            branches: [11,22]
        },
        22: {
            fullDisplay: `<h3>p3: The third</h3><br>
            I should stop with these names.<br>
            2.5x Point gain<br>
            Cost: 100p`,
            canAfford() {return player.points.gte(100)},
            pay() {player.points = player.points.sub(100)},
            branches: [12],
            unlocked() {return hasUpgrade(this.layer,21)}
        },
        12: {
            fullDisplay: `<h3>p4: What?!</h3><br>
            You can go back down?<br>
            +1 base point gain (cool upgrade)<br>
            Cost: 300p`,
            canAfford() {return player.points.gte(300)},
            pay() {player.points = player.points.sub(300)},
            branches: [31],
            unlocked() {return hasUpgrade(this.layer,22)}
        },
        31: {
            fullDisplay: `<h3>p5: Okay</h3><br>
            Back on track.<br>
            1.5x point gain<br>
            Cost: 500p`,
            canAfford() {return player.points.gte(500)},
            pay() {player.points = player.points.sub(500)},
            branches: [32,33],
            unlocked() {return hasUpgrade(this.layer,12)}
        },
        32: {
            fullDisplay() {if(hasUpgrade(this.layer,33)) return `<h3>p6: Choices 1</h3><br>
            That one unlocked 2 upgrades!<br>
            +1.5 Base point gain.<br>
            Cost: 2000p`
            else return `<h3>p6: Choices 1</h3><br>
            That one unlocked 2 upgrades!<br>
            +1.5 Base point gain.<br>
            Cost: 750p`},
            canAfford() {if (hasUpgrade(this.layer,33)) return player.points.gte(2000)
            else return player.points.gte(750)},
            pay() {if (hasUpgrade(this.layer,33)) player.points = player.points.sub(2000)
            else player.points = player.points.sub(750)},
            unlocked() {return hasUpgrade(this.layer,31)}
        },
        33: {
            fullDisplay() {if(hasUpgrade(this.layer,32)) return `<h3>p7: Choices 2</h3><br>
            Don't worry, you can buy both<br>
            (But the price gets increased)<br>
            2x point gain.<br>
            Cost: 2000p`
            else return `<h3>p7: Choices 2</h3><br>
            Don't worry, you can buy both!<br>
            (But the price gets increased)<br>
            x2 point gain.<br>
            Cost: 750p`},
            canAfford() {if (hasUpgrade(this.layer,32)) return player.points.gte(2000)
            else return player.points.gte(750)},
            pay() {if (hasUpgrade(this.layer,32)) player.points = player.points.sub(2000)
            else player.points = player.points.sub(750)},
            unlocked() {return hasUpgrade(this.layer,31)}
        },
        41: {
            fullDisplay: `<h3>p8: Onwards and upgrading</h3><br>
            See what I did there?<br>
            3x point gain.<br>
            Cost: 3000p`,
            canAfford() {return player.points.gte(3000)},
            pay() {player.points = player.points.sub(3000)},
            branches: [32,33],
            unlocked() {return hasUpgrade(this.layer,32) && hasUpgrade(this.layer,33)}
        },
        42: {
            fullDisplay: `<h3>p9: Close!</h3><br>
            The next upgrade will do something new...<br>
            +2.5 base point gain.<br>
            Cost: 7500p`,
            canAfford() {return player.points.gte(7500)},
            pay() {player.points = player.points.sub(7500)},
            branches: [41],
            unlocked() {return hasUpgrade(this.layer,41)}
        },
        51: {
            fullDisplay: `<h3>p10: The Pinnacle</h3><br>
            You made it to the 10th upgrade! Good for you.<br>
            8x points, and unlocks the first reset layer.<br>
            Good luck!<br>
            Cost: 15000p`,
            canAfford() {return player.points.gte(15000)},
            pay() {player.points = player.points.sub(15000)},
            branches: [42],
            unlocked() {return hasUpgrade(this.layer,42)}
        },
        13: {
            fullDisplay: `<h3>p11: You wanted more?</h3><br>
            1.8x Point gain.<br>
            Cost: 150,000p`,
            canAfford() {return player.points.gte(150000)},
            pay() {player.points = player.points.sub(150000)},
            branches: [14],
            unlocked() {return hasUpgrade('pr',21)}
        },
        14: {
            fullDisplay: `<h3>p12: You got it.</h3><br>
            1.8x Point gain.<br>
            Cost: 300,000p`,
            canAfford() {return player.points.gte(300000)},
            pay() {player.points = player.points.sub(30000)},
            branches: [13],
            unlocked() {return hasUpgrade('pr',21) && hasUpgrade('p',13)}
        },
        61: {
            fullDisplay() {return `<h3>p13: Above</h3><br>
            I feel like we should have had this before now...<br>
            Points boost their own gain.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 750,000p`},
            effect() {return player.points.pow(0.1).add(1)},
            canAfford() {return player.points.gte(750000)},
            pay() {player.points = player.points.sub(750000)},
            branches: [13,14,62,63],
            unlocked() {return hasUpgrade(this.layer,13) && hasUpgrade(this.layer,14)}
        },
        62: {
            fullDisplay() {if (!hasUpgrade(this.layer,63)) return `<h3>p14: Left</h3><br>
            Prestige gain on reset boosts point gain.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 1e11p`
            else return `<h3>p14: Left</h3><br>
            Prestige gain on reset boosts point gain.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 1.5e12p`},
            effect() {return getResetGain('pr').pow(0.25).add(1)},
            canAfford() {if (!hasUpgrade(this.layer,63)) return player.points.gte(1e11)
            else return player.points.gte(1.5e12)},
            pay() {if(!hasUpgrade(this.layer,63)) player.points = player.points.sub(1e11)
            else player.points = player.points.sub(1.5e12)},
            unlocked() {return hasUpgrade('pr',32) && hasUpgrade(this.layer,61)},
            tooltip() {return "Left and Right function similar to the Choice upgrades in that one increases the price of the other"}
        },
        63: {
            fullDisplay() {if (!hasUpgrade(this.layer,62)) return `<h3>p15: Right</h3><br>
            Point gain boosts Prestige gain on reset.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 1e11p`
            else return `<h3>p15: Right</h3><br>
            Point gain boosts Prestige gain on reset.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 1.5e12p`},
            effect() {return getPointGen().pow(0.06).add(1)},
            canAfford() {if(!hasUpgrade(this.layer,62)) return player.points.gte(1e11)
            else return player.points.gte(1.5e12)},
            pay() {if(!hasUpgrade(this.layer,62)) player.points = player.points.sub(1e11)
            else player.points = player.points.sub(1.5e12)},
            unlocked() {return hasUpgrade('pr',32) && hasUpgrade(this.layer,61)},
            tooltip() {return "Left and Right function similar to the Choice upgrades in that one increases the price of the other"}
        },
        901: {
            fullDisplay() {return `<h3>p16: Below??</h3><br>
            Impossible...<br>
            Unlock the Negative tree and begin generating Negative points.<br>
            Cost:1e13p`},
            canAfford() {return player.points.gte(1e13)},
            pay() {player.points = player.points.sub(1e13)},
            unlocked() {return hasUpgrade(this.layer,62) && hasUpgrade(this.layer,63)},
            tooltip() {return "This goes into a new tab called Negative."},
            branches: [62,63]
        }
    }, //contains one copyable upgrade.
    achievements: {
        11: {
            name: "Example",
            done() { return },
            tooltip: "Example",
            effect() {},
            unlocked() {},
            onComplete() {},
        }
    }, //contains one copyable achievement.
    infoboxes: {
        1: {
            title() {return "You have " + format(player.points) + "p (Points) | +" + format(getPointGen()) + "/s‎"},
            body() {return "Before you begin to play, go to the tree tab and navigate to the settings, then set single-tab mode to ALWAYS. This is very important! Once you've done that, you can click on the white section at the top of this infobox to minimize it."},
            unlocked() {return true}
        }
    },
    milestones: {
        1: {
            requirementDescription: "Example",
            effectDescription: "Gives you an Example",
            done() {},
            onComplete() {},
            unlocked() {},
        },
    }, //Contains one copyable milestone.
    clickables: {
        11: {
            title: "Reset your points",
            display() {return `This is useful for when I spend time making something and need to see how long a timewall is but have a ton of points built up from the wait.<br>
            This will remove all of your ` + format(player.points) + ` points.`},
            canClick() {return true},
            onClick() {player.points = player.points.sub(player.points)}
        },
        12: {
            title: "Quarter your points",
            display() {return "Remove 3/4 of your points. This will equate to removing " + format(player.points.times(0.75)) + " Points away."},
            canClick() {return true},
            onClick() {player.points = player.points.sub(player.points.times(0.75))}
        },
        21: {
            title: "Reset your prestige points",
            display() {return `All of your prestige points will be gone. This is useful if I'm fooling around and get an absolutely massive amount of them which unbalances the game.<br>
            This will remove all of your ` + format(player.pr.points) + ` Prestige Points.`},
            canClick() {return true},
            onClick() {player.pr.points = player.pr.points.sub(player.pr.points)}
        },
        22: {
            title: "Quarter your prestige points",
            display() {return `Remove 3/4 of your prestige points. This will equate to removing ` + format(player.pr.points.times(0.75)) + " Prestige Points away."},
            canClick() {return true},
            onClick() {player.pr.points = player.pr.points.sub(player.pr.points.times(0.75))}
        },
        31: {
            title: "Double your DevSpeed",
            display() {return `Multiply your DevSpeed by 2x.`},
            canClick() {return true},
            onClick() {player.devSpeed = player.devSpeed * 2}
        },
        32: {
            title: "Reset your DevSpeed",
            display() {return `Set your DevSpeed back to 1x.<br>
            Your DevSpeed is currently ` + format(player.devSpeed) + `x`},
            canClick() {return true},
            onClick() {player.devSpeed = 1}
        },
        33: {
            title: "Pause the game.",
            display() {return `The clickable effectively does this by setting your devSpeed to 0, preventing point generation and other processes.`},
            canClick() {return true},
            onClick() {player.devSpeed = new Decimal(1e-1000000)}
        },
        41: {
            title: "Reset your Negative points.",
            display() {return `Yeah.`},
            canClick() {return true},
            onClick() {player.np.points = player.np.points.sub(player.np.points)}
        }
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Example" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return },
            effect() { return },
            display() { return },
            purchaseLimit: {},
            tooltip: "Example"
        },
    }, //Contains one copyable buyable.
    //I would add a challenge but I am NOT doing allat (maybe later)
    layerShown(){return false},
    unlocked() {return false},
    tooltip() {return player[this.layer].points+" "+this.resource+` <br>
    Click to view`}
})

addLayer("pr", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#287233",
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "Prestige points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    prestigeButtonText() {return `Reset Points and Point upgrades for ` + getResetGain(this.layer) + ` Prestige Points`},
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('og',21)) mult = mult.times(1.8)
        if(hasUpgrade('og',23)) mult = mult.times(upgradeEffect('og',23))
        if(hasUpgrade('pr',31)) mult = mult.times(1.5)
        if(hasUpgrade('pr',13)) mult = mult.times(2)
        if(hasUpgrade('p',63)) mult = mult.times(upgradeEffect('p',63))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", 1],
                "prestige-button",
                ["upgrade-tree", [[11,12,13], [21], [31,32]]]
            ],
            buttonStyle: {
                "width": "450px",
                "margin": "10px"
            },
            glowColor: "#287233"
        },
        "OG": {
            embedLayer: "og",
            glowColor: "#287233",
            unlocked() {return hasUpgrade('pr',12)},
            buttonStyle: {
                "width": "450px",
                "margin": "10px"
            },
            glowColor: "#287233"
        }
    },
    upgrades: {
        11: {
            fullDisplay: `<h3>P1: Stage two</h3><br>
            You did it!<br>
            x2 point gain.<br>
            Cost: 1P`,
            canAfford() {return player[this.layer].points.gte(1)},
            pay() {player[this.layer].points = player[this.layer].points.sub(1)},
            unlocked() {return true},
        },
        21: {
            fullDisplay: `<h3>P2: Extension I</h3><br>
            Yeah sure ok.<br>
            x1.5 point gain and unlock new upgrades.<br>
            Currently: 3 upgrades<br>
            Cost: 2P`,
            canAfford() {return player[this.layer].points.gte(2)},
            pay() {player[this.layer].points = player[this.layer].points.sub(2)},
            branches: [11],
            unlocked() {return hasUpgrade(this.layer,11)},
        },
        12: {
            fullDisplay: `<h3>P3: Bring back OG!</h3><br>
            Hey, you asked for it!<br>
            Unlock a new tab with upgrades from the original Prestige Tree.<br>
            Cost: 5P`,
            canAfford() {return player[this.layer].points.gte(5)},
            pay() {player[this.layer].points = player[this.layer].points.sub(5)},
            branches: [21],
            unlocked() {return hasUpgrade(this.layer,21)}
        },
        31: {
            fullDisplay: `<h3>P4: We are so back</h3><br>
            Back on track like in Geometry Dash<br>
            x3 Point gain, x1.5 Prestige Point gain<br>
            Cost: 1000P`,
            canAfford() {return player[this.layer].points.gte(1000)},
            pay() {player[this.layer].points = player[this.layer].points.sub(1000)},
            branches: [12,21],
            unlocked() {return hasUpgrade('og',23)}
        },
        13: {
            fullDisplay: `<h3>P5: MORE!!!</h3><br>
            I need it...<br>
            x2 Prestige Point gain.<br>
            Cost: 2500P`,
            canAfford() {return player[this.layer].points.gte(2500)},
            pay() {player[this.layer].points = player[this.layer].points.sub(2500)},
            branches: [31],
            unlocked() {return hasUpgrade('pr',31)}
        },
        32: {
            fullDisplay: `<h3>P6: There we go</h3><br>
            Yeah I think that's enough.<br>
            Unlock even more point upgrades.<br>
            Cost: 10,000P`,
            canAfford() {return player[this.layer].points.gte(10000)},
            pay() {player[this.layer].points = player[this.layer].points.sub(10000)},
            branches: [13],
            unlocked() {return hasUpgrade('pr',13)}
        }
    }, //contains one copyable upgrade.
    achievements: {
        11: {
            name: "Example",
            done() { return },
            tooltip: "Example",
            effect() {},
            unlocked() {},
            onComplete() {},
        }
    }, //contains one copyable achievement.
    infoboxes: {
        1: {
            title() {return "You have " + format(player[this.layer].points) + "P (Prestige points)"},
            body() {return "This is the first reset layer, Prestige! This only resets your points and their upgrades, so it shouldn't be too brutal to get back here."},
            unlocked() {return true},
        },
    }, //Contains one copyable infobox.
    milestones: {
        1: {
            requirementDescription: "Ignore",
            effectDescription: "Leave me alone",
            done() {return player[this.layer].points.gte(1)},
            onComplete() {},
            unlocked() {return true},
        },
    }, //Contains one copyable milestone.
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "Example" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return },
            effect() { return },
            display() { return },
            purchaseLimit: {},
            tooltip: "Example"
        },
    }, //Contains one copyable buyable.
    //I would add a challenge but I am NOT doing allat (maybe later)
    layerShown(){return false},
    unlocked() {return false},
    tooltip() {return player[this.layer].points+" "+this.resource+` <br>
    Click to view`}
})

addLayer("og", {
    name: "OG prestige",
    symbol: "og",
    position: 1,
    startData() {return {
        unlocked: true,
        points: 0
    }},
    color: "#287233",
    type: "none",
    tabFormat: {
        "Upgrades": {
            content: [
                ["infobox", 1],
                ["upgrade-tree", [[11,12,13], [21,22,23]]]
            ]
        }
    },
    infoboxes: {
        1: {
            title() {return "You have " + format(player.pr.points) + "P (Prestige points)"},
            body() {return `Welcome to OG! These upgrades were taken from Jacorb's Prestige Tree, which inspired the creation of the modding tree, so credits go to them.<br>
            Sorry, but you'll have to return to the main prestige tab to reset for more Prestige Points.`}
        }
    },
    upgrades: {
        11:{
            fullDisplay() {return `<h3>OG-P1: Begin+</h3><br>
            Each OG upgrade purchased increases base point gain by 1.<br>
            Currently: +` + format(this.effect()) +`<br>
            Cost: 2P`},
            effect() {
                var ogupgradespurchased = new Decimal(1)
                if(hasUpgrade(this.layer,12)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,13)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,21)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,22)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,23)) ogupgradespurchased = ogupgradespurchased.add(1)
                return ogupgradespurchased
            },
            canAfford() {return player.pr.points.gte(2)},
            pay() {player.pr.points = player.pr.points.sub(2)},
            branches: [12,21],
            unlocked(){return true}
        },
        12:{
            fullDisplay() {return `<h3>OG-P2: Prestige Boost</h3><br>
            Prestige Points boost Point generation.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 8P`},
            effect() {
                return player.pr.points.add(2).pow(0.5)
            },
            canAfford() {return player.pr.points.gte(8)},
            pay() {player.pr.points = player.pr.points.sub(8)},
            branches: [13,22],
            unlocked(){return hasUpgrade(this.layer,11)}
        },
        13:{
            fullDisplay() {return `<h3>OG-P3: Self-Synergy</h3><br>
            Points boost their own generation.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Cost: 20P`},
            effect() {return player.points.add(1).log10().pow(0.75).add(1)},
            canAfford() {return player.pr.points.gte(20)},
            pay() {player.pr.points = player.pr.points.sub(20)},
            branches: [21,23],
            unlocked(){return hasUpgrade(this.layer,12)}
        },
        21:{
            fullDisplay() {return `<h3>OG-P4: More Prestige</h3><br>
            Prestige Point gain is increased by 80%.<br>
            Cost: 50P`},
            canAfford() {return player.pr.points.gte(50)},
            pay() {player.pr.points = player.pr.points.sub(50)},
            branches: [22],
            unlocked(){return hasUpgrade(this.layer,13)}
        },
        22:{
            fullDisplay() {return `<h3>OG-P5: Upgrade Power</h3><br>
            Point generation is faster based on your Prestige Upgrades bought.<br>
            Currently: ` + format(this.effect()) + `x<br>
            (OG ONLY)<br>
            Cost: 100P`},
            effect() {
                var ogupgradespurchased = new Decimal(1)
                if(hasUpgrade(this.layer,11)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,12)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,13)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,21)) ogupgradespurchased = ogupgradespurchased.add(1)
                if(hasUpgrade(this.layer,23)) ogupgradespurchased = ogupgradespurchased.add(1)
                return new Decimal(1.4).pow(ogupgradespurchased)
            },
            canAfford() {return player.pr.points.gte(100)},
            pay() {player.pr.points = player.pr.points.sub(100)},
            branches: [23],
            unlocked(){return hasUpgrade(this.layer,21)}
        },
        23:{
            fullDisplay() {return `<h4>OG-P6: Reverse Prestige Boost</h4><br>
            Prestige Point gain is boosted by your Points.<br>
            Currently: ` + format(this.effect()) +`x<br>
            (I couldn't figure out the formula so I changed it)<br>
            Cost: 250P`},
            effect() {
                return player.points.add(1).pow(0.03).add(1)
            },
            canAfford() {return player.pr.points.gte(250)},
            pay() {player.pr.points = player.pr.points.sub(250)},
            tooltip: "Check main prestige upgrades after",
            unlocked(){return hasUpgrade(this.layer,22)}
        }
    }
})

addLayer("np", {
    name: "negative",
    symbol: "neg",
    position: 2,
    row: 1,
    startData() {return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "#CB2821",
    requires: new Decimal(10),
    resource: "Negative Points",
    effect() {
        var effect = player.np.points.pow(0.15)
        return effect
    },
    canReset: false,
    baseResource: "Point gain",
    baseAmount() {return getPointGen()},
    type: "normal",
    exponent: 0.0000000000000000001,
    gainMult() {
        mult = new Decimal(0)
        if(hasUpgrade('p',901)) mult = new Decimal(getPointGen()).pow(0.01).div(getPointGen().pow(0.06)).times(6)
        if(hasUpgrade(this.layer,11)) mult = mult.times(upgradeEffect(this.layer,11))
        return mult
    },
    tabFormat: {
        "upgrades": {
            content: [
                ["infobox",1],
                ["infobox",2],
                "blank",
                ["upgrade-tree", [[31],[21],[11]]]
            ],
        }
    },
    infoboxes: {
        1: {
            title() {return "You have " + format(player.np.points) + "n (Negative Points) | +" + format(getResetGain(this.layer)) +  "/s"},
            body() {return `Welcome to Negative! You will (very) slowly gain negative points based on your point gain. Upgrades in this layer will boost negative point gain as well as other things though, so don't worry!<br>
            Also, to keep with the negative theme, the tree will build up instead of down. You may need to scroll to see it.<br>
            Each negative upgrade will perform an ADDITION, which basically just resets your Negative Points to zero.`}
        },
        2: {
            title() {return "Your Negative Points are decreasing the base point gain by -" + format(player.np.points.pow(0.2))},
            body() {return "Don't worry though, this is also decreased with upgrades..."}
        }
    },
    upgrades: {
        11: {
            fullDisplay() {return `<h3>n1: Below indeed</h3><br>
            Negative points boost their own gain a little.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Requires: 50n`},
            effect() {
                return player.np.points.pow(0.125)
            },
            canAfford() {return player.np.points.gte(50)},
            pay() {player.np.points = new Decimal(0)},
            unlocked() {return true},
            branches: [31]
        },
        31: {
            fullDisplay() {return `<h3>n2: Rising</h3><br>
            Prestige points boost Negative Point gain.<br>
            Currently: ` + format(this.effect()) + `x<br>
            Requires: 150n`},
            effect() {
                return player.pr.points.pow(0.0125)  
            },
            canAfford() {return player.points.gte(150)},
            pay() {player.np.points = new Decimal(0)},
            unlocked() {return hasUpgrade(this.layer,11)}
        },
        21: {
            fullDisplay() {return `<h3>n3: Falling</h3><br>
            Negative Points boost Prestige point gain`},
            unlocked() {return hasUpgrade(this.layer,31)}
        }
    },
    passiveGeneration() {return 1},
    unlocked: true,
    layerShown: false
})
//13123241
let modInfo = {
	name: "The Prestige Upgrade Tree",
	id: "jakevectorverycoolupgradetreeintmtyesverygood3",
	author: "Jake Vector/JanexTheHero1/JakeTheNewKnight",
	pointsName: "Points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Jake Vector's Official Discord",
	discordLink: "https://discord.gg/4dECpMyJmb",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.9",
	name: "The update of version 0.9",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.9</h3><br>
		- Fixed upgrade p3 (2.5x p)<br>
		- Buffed Negative Points’ effect, essentially nerfing point gain slightly<br>
		- Fixed upgrade n2’s effect, preventing breaking the game… every time<br>
		- Completed upgrade n3<br>
		- Added upgrades n4 and n5, completing early Negative section<br>
		- Made the tab for Row 2 with 2 empty layers, Booster Energy and Generators.<br>
		- New endgame: 1 of either Booster Energy or Generators<br><br>
	<h3>v0.8</h3><br>
		- Added the first negative upgrade.<br>
		- Submitted the game to <a href="https://galaxy.click">galaxy.click</a> (And didn't realize it got accepted until a year later).<br><br>
	<h3>v0.7</h3><br>
		- Broke negative a lot and had to remake it.<br>
		- FIXED NEGATIVE AND ADDED AN EFFECT LETS GOOOO (Now I can make content)<br><br>
	<h3>v0.6</h3><br>
		- Added 3 point upgrades.<br>
		- Began work on Negative.<br>
		- Customized the tab button text colors.<br><br>
	<h3>v0.5</h3><br>
		- Added Prestige.<br>
		- Added the first Prestige upgrade.<br>
		- Added the second and third Prestige upgrades.<br>
		- Added the 6 OG upgrades.<br>
		- Added 3 more Prestige upgrades.<br><br>
	<h3>v0.4</h3><br>
		- Added the eighth upgrade.<br>
		- Added the ninth and tenth upgrades. It's time...<br><br>
	<h3>v0.3</h3><br>
		- Added the third, fourth and fifth upgrades.<br>
		- Added the sixth and seventh upgrades.<br>
		- Started plotting for the first reset layer.<br>
		- Added a testing tab in the points layer with a reset points button.<br><br>
	<h3>v0.2</h3><br>
		- Added an infobox that displays your points inside a layer.<br>
		- Couldn't figure out how to remove a layer resource display so there's just a big fat zero on every layer.<br>
		- Added the first upgrade again.<br>
		- Added the second upgrade.<br>
		- Made the point infobox display gain as well.<br>
		- Checked out Create Incremental's code to find out how to make an upgrade tree. (Thank you BanaCubed)<br>
		- Actually did remove the layer resource display.<br><br>
	<h3>v0.1</h3><br>
		- Made the thing (Very important!).<br>
		- Added the Main Layer.<br>
		- Made an upgrade but destroyed it to migrate it to its own layer instead of being stored inside Main.`

let winText = `Congratulations! You have completed what exists of my upgrade tree! I am endgaming you for a reason, so please don't continue playing until this screen naturally disappears, because that will mean I have changed the endgame as a result of an update. Thank you for playing what I have so far!<br>
(Players on Galaxy, I would appreciate your feedback!)`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	//BPG+ upgrades
	if(hasUpgrade('p',12)) gain = gain.add(1)
	if(hasUpgrade('p',32)) gain = gain.add(1.5)
	if(hasUpgrade('p',42)) gain = gain.add(2.5)
	if(hasUpgrade('og',11)) gain = gain.add(upgradeEffect('og',11))

	//BPG- Nerfs
	if(hasUpgrade('p', 901)) gain = gain.sub(player.np.points.pow(0.2))

	//Safeguards
	if (gain.lte(1)) gain = new Decimal(1)

	//PGM+ upgrades	
	if(hasUpgrade('p',11)) gain = gain.times(3)
	if(hasUpgrade('p',21)) gain = gain.times(2)
	if(hasUpgrade('p',22)) gain = gain.times(2.5)
	if(hasUpgrade('p',31)) gain = gain.times(1.5)
	if(hasUpgrade('p',33)) gain = gain.times(2)
	if(hasUpgrade('p',41)) gain = gain.times(3)
	if(hasUpgrade('p',51)) gain = gain.times(8)
	if(hasUpgrade('pr',11)) gain = gain.times(2)
	if(hasUpgrade('pr',21)) gain = gain.times(1.5)
	if(hasUpgrade('p',13)) gain = gain.times(1.8)
	if(hasUpgrade('p',14)) gain = gain.times(1.8)
	if(hasUpgrade('p',61)) gain = gain.times(player.points.pow(0.1).add(1))
	if(hasUpgrade('og',12)) gain = gain.times(player.pr.points.add(2).pow(0.5))
	if(hasUpgrade('og',13)) gain = gain.times(player.points.add(1).log10().pow(0.75).add(1))
	if(hasUpgrade('og',22)) gain = gain.times(upgradeEffect('og',22))
	if(hasUpgrade('pr',31)) gain = gain.times(3)
	if(hasUpgrade('p',62)) gain = gain.times(upgradeEffect('p',62))
	if(hasUpgrade('np',22)) gain = gain.times(upgradeEffect('np',22))

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return (player.bst.points.gte(1) || player.gen.points.gte(1))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
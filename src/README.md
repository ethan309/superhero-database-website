# Superhero, Supervillain, & Character Database Source File Guidance
CSCE 411 (Data Modeling) Final Project

## Files
- `pages/`: website pages shown to the user.
	- `CharacterStats.vue`: character details page. Shows all available statistics for a character in text and visualizations.
	- `Explore.vue`: a page for comparing metrics between characters. Allows the user to view the same metric for all characters at once (if available) on a variety of visualizations.
	- `Home.vue`: the homepage! Shows a list of suggested characters to look at.
	- `Search.vue`: a page that allows searching of every character by name.
- `components/`: smaller, reusable modules.
	- `CharacterCard.vue`: the cards on which a character's name is displayed (links to character's details page).
	- `CharacterSearch.vue`: a component that allows searching every character by name.
	- `NavBar.vue`: the site navigation bar seen at the top of every page.
	- `PowerCard.vue`: the cards on which a character's powers are displayed.
- `router/`: logic for page connections and routing on website.
- `assets/`: contains image and file assets for display on website.
- `constants.js`: a few common constants used by multiple pages and components, abstracted into their own file.
- `routes.js`: logic for page connections and API calls.
- `characterPowersCache.js`: temporary cache of expensive API call response.

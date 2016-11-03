# Build the TypeScript
tsc

# Build the core css
node-sass src/sass/main.scss dist/css/main.css

################################################################################
### Build the themes
################################################################################

# Build the material theme
node-sass src/sass/themes/material/main.scss dist/css/themes/material.css
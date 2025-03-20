# TypeMaster - Typing Test Website

A modern typing test website inspired by MonkeyType, built with HTML, CSS, and JavaScript.

## Features

- Clean, minimalist design similar to MonkeyType
- Multiple typing modes:
  - Paragraph mode with diverse content
  - Quote mode with programming quotes
  - Code mode with programming snippets
- Real-time WPM (Words Per Minute) calculation
- Raw WPM and accuracy tracking
- Multiple time options (15s, 30s, 60s, 120s)
- Progress bar for visual time tracking
- Personal best tracking with local storage
- Typing performance heatmap visualization
- Dark and light theme toggle with preference saving
- Keyboard shortcuts for improved usability
- Responsive design for all devices
- Detailed results screen with sharing option

## How to Use

1. Open `index.html` in your web browser
2. Select your preferred typing mode (Paragraph, Quote, or Code)
3. Choose a time duration (15s, 30s, 60s, or 120s)
4. Click anywhere to focus on the typing area
5. Start typing the displayed text
6. The timer will automatically start when you begin typing
7. Complete the test or wait for the timer to end
8. View your results, including WPM, accuracy, and typing performance
9. Try again or share your results!

## Keyboard Shortcuts

- `Tab + Enter`: Restart the test
- `Esc`: Reset the current test

## Technologies Used

- HTML5
- CSS3 (with CSS variables for theming)
- Vanilla JavaScript (no frameworks)
- Local Storage API for saving preferences and personal bests
- Font Awesome for icons
- Google Fonts (Roboto Mono and Lexend Deca)

## Customization

You can easily customize the typing test by:

- Adding more text samples in the `textSamples` array in `script.js`
- Adding more quotes in the `quotesSamples` array
- Adding more code snippets in the `codeSamples` array
- Changing the color scheme by modifying the CSS variables in `styles.css`
- Adding more time options in the HTML and updating the JavaScript accordingly

## License

This project is open source and available for personal and educational use.

## Acknowledgements

- Inspired by [MonkeyType](https://monkeytype.com/)
- Font Awesome for the icons
- Google Fonts for Roboto Mono and Lexend Deca fonts 
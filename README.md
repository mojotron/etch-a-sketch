# Etch-A-Sketch

This project was to build a cross between sketch pad and etch-a-sketch toy. User can draw by holding left mouse click and hovering over grid element, choosing between number of pen options and adding grid gap for better precision and resizing grid.
Goal of the project is to get comfortable with creating and manipulating DOM elements.

This project is part of [The Odin Project](https://www.theodinproject.com/) Curriculum. This was a challenging project, but fun with a lot of parts and opportunities for learning.

View live preview of [Etch-A-Sketch](https://mojotron.github.io/etch-a-sketch/index.html) project via GitHub pages!

## What have I learned

- Planning and pseudo code - before any line of code I would draw a diagram and page design on a piece of paper. All code was first written as pseudo code on the paper then as comments in js file.
- Comments - after writing the initial working code, I refactored the code and simplified it until there was no need for comments. Left comments are only to divide sections and as a note why did i do logic, when it is not clear on first scan.
- Slicing functions - dividing logic from functions to simple units. Smaller functions to do one simple thing. Trying to have pure function without side effects.
- CSS Grid - using CSS Grid repeat function was a simple and clean way of drawing the entire grid.
- Dynamically filling the grid with JS - instead making initial grid of n x n div elements.
- Event listers overlap - the biggest problem of building this project was making lines on drawing grid by holding mouse and hovering. I found the solution using global flag variable that listens for on mouse down and making it true, by realising mouse flag is false and stops drawing by mouseenter listener.
- insertAdjustedElement method - until now I used appendChild method.
- Making custom buttons and custom radio buttons- instead using button elements for challenge I used span elements and dataset attributes for custom buttons.
- Responsive design- making responsive page was bit of challenging due to bad planning in the initial phase. After refactoring with grid flex display option I was able to make it as planned.

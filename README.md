# Web Slides

A custom-built presentation framework for creating professional slide presentations with mathematical equations. This project features smooth slide transitions, frame-by-frame animations, and MathJax integration for rendering LaTeX equations.

## 🎯 Features

- **Smooth Slide Transitions**: Custom CSS animations for slide navigation with directional movement
- **Frame-by-Frame Reveals**: Progressive disclosure of content within slides (similar to PowerPoint animations)
- **MathJax Integration**: Full support for LaTeX mathematical equations with automatic numbering
- **Keyboard Navigation**: Intuitive controls for presentation flow
- **Slide Counter**: Real-time display of current slide and frame position
- **Modular CSS Architecture**: Organized stylesheet structure for easy customization
- **Responsive Design**: Adapts to different screen sizes

##  Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools or dependencies required!

### Running the Presentation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Use keyboard controls to navigate

### Keyboard Controls

| Key | Action |
|-----|--------|
| `→` (Right Arrow) | Next slide or reveal next frame |
| `←` (Left Arrow) | Previous slide or hide current frame |
| `d` | Quick next (skip frame animations) |
| `a` | Quick previous (skip frame animations) |

## 🎨 Customization

### Adding New Slides

Add a new `<section>` element inside the `<main class="screen">` container:

```html
<section class="slide">
  <div class="content title-body">
    <header>
      <h1>Your Title</h1>
    </header>
    <div class="body">
      <!-- Your content here -->
    </div>
  </div>
</section>
```

### Slide Layouts

Three main layout types are available:

1. **`first`** - Title slide with centered content
2. **`title-body`** - Standard slide with header and body
3. **`empty`** - Full-screen content (for images/diagrams)

### Adding Frame Animations

Wrap content in `<div class="frame">` to create progressive reveals:

```html
<div class="body">
  <div class="frame">First point</div>
  <div class="frame">Second point</div>
  <div class="frame">Third point</div>
</div>
```

### Mathematical Equations

Use MathJax syntax for equations:

```html
<p>Inline equation: \( E = mc^2 \)</p>
<p>Display equation: \[ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} \]</p>
```



## 🛠️ Technical Details

- **Pure Vanilla JavaScript**: No frameworks or libraries (except MathJax)
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Animations**: Hardware-accelerated transitions
- **Event-Driven Architecture**: Prevents race conditions during animations
- **Modular CSS**: Easy to maintain and extend

## 📝 License

This project is available for educational and academic use.

## 🤝 Contributing

Feel free to fork this project and adapt it for your own presentations. Suggestions and improvements are welcome!

---

**Note**: This is a custom presentation framework built from scratch as an alternative to PowerPoint, Beamer, or reveal.js, with specific features tailored for academic and technical presentations requiring mathematical equations.

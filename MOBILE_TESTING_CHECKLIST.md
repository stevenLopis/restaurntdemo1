# Mobile Responsiveness Testing Checklist

## Pre-Testing Setup
- [ ] Open browser DevTools (F12)
- [ ] Enable Device Toolbar (Ctrl+Shift+M or Cmd+Shift+M)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Do a hard refresh (Ctrl+F5)

---

## Screen Size Tests

### Extra Small Phones (320px - 480px)
**Test Navbar:**
- [ ] Navbar height is compact (~56px)
- [ ] Logo box visible but text hidden
- [ ] Hamburger menu button visible (44px × 44px)
- [ ] No text overflow in navbar
- [ ] Mobile menu opens/closes smoothly

**Test Hero Section:**
- [ ] Heading font size is readable (~1.75rem)
- [ ] Single column layout (no side-by-side)
- [ ] Image below text (stacked vertically)
- [ ] All text wraps properly
- [ ] No horizontal scroll

**Test Buttons:**
- [ ] "Order Now" button is full-width or properly sized
- [ ] Button height ≥ 44px for touch
- [ ] Button text fits without truncation
- [ ] Bottom margin prevents overlap with next element

**Test General:**
- [ ] No content touching left/right edges (16px padding)
- [ ] All sections have proper padding
- [ ] Typography is readable
- [ ] No horizontal scrollbar visible

---

### Small Mobile (480px - 640px)
**Test Menu Page:**
- [ ] Food cards are 1 column wide
- [ ] Card padding looks appropriate (12px)
- [ ] Image aspect ratio is maintained (4:3)
- [ ] Card buttons don't overflow
- [ ] Category filter pills wrap and don't overflow

**Test Product Detail:**
- [ ] Image is full width
- [ ] Details section below image (not beside)
- [ ] Quantity buttons are properly sized (28px)
- [ ] Add to cart button is full width
- [ ] Stats grid is single column

**Test General:**
- [ ] Navbar hasn't broken
- [ ] All text is legible
- [ ] No weird spacing
- [ ] Dividers and lines fit properly

---

### Mobile (640px - 767px)
**Test Pages:**
- [ ] All pages render correctly
- [ ] Font sizes are appropriate
- [ ] Grid layouts haven't broken
- [ ] Buttons are properly sized
- [ ] Forms work correctly

**Test Navigation:**
- [ ] Hamburger menu still visible (not desktop menu)
- [ ] Mobile menu opens/closes properly
- [ ] Menu items are clickable
- [ ] Cart button is accessible

---

### Tablet (768px - 1023px)
**Verify Breakpoint Change:**
- [ ] Desktop menu appears (hamburger disappears)
- [ ] Navbar height increases to ~68px
- [ ] Logo and tagline become visible
- [ ] Menu grid shows 2 columns
- [ ] Layout looks balanced

**Test Functionality:**
- [ ] All navigation items visible in desktop menu
- [ ] Menu hover states work
- [ ] Cart icon and badge display correctly
- [ ] No mobile menu visible

---

### Desktop (1024px+)
**Verify Full Layout:**
- [ ] Hero section has 2-column layout (image on right)
- [ ] Menu grid shows 3+ columns (auto-fill)
- [ ] All desktop styling applies
- [ ] Navigation menu fully displayed
- [ ] Desktop interactions work (hover effects)

**Test Large Elements:**
- [ ] Hero heading is large and readable
- [ ] Content has proper max-width
- [ ] Spacing looks balanced
- [ ] Images display at proper resolution

---

## Component-Specific Tests

### Navbar Tests
```
Size: 320px  → Hamburger visible, logo text hidden ✓
Size: 480px  → Hamburger visible, logo text hidden ✓
Size: 768px  → Desktop menu visible, hamburger hidden ✓
Size: 1200px → Full desktop layout ✓
```
- [ ] Mobile menu drop-down animates smoothly
- [ ] Mobile menu background blur effect works
- [ ] Active menu item highlighting works
- [ ] Cart badge displays correctly
- [ ] All touches/clicks register

### Hero Section Tests
```
Mobile (320px)  → Single column, text centered ✓
Mobile (640px)  → Still single column ✓
Tablet (768px)  → Single column ✓
Desktop (1024px) → Two-column layout ✓
```
- [ ] All text wraps properly
- [ ] Image aspect ratio maintained
- [ ] Grid overlay is subtle
- [ ] Light streaks don't cause scrolling
- [ ] CTA buttons are clickable

### Menu Grid Tests
```
Mobile (320px)  → 1 column ✓
Mobile (640px)  → 1 column ✓
Tablet (768px)  → 2 columns ✓
Desktop (1024px) → 3 columns ✓
Desktop (1440px) → 4 columns (auto-fill) ✓
```
- [ ] Cards have proper spacing (gap: 16-24px)
- [ ] Card images don't stretch
- [ ] Card text doesn't overflow
- [ ] Category filter pills wrap properly
- [ ] No horizontal scroll in grid

### Food Card Tests
- [ ] Badge displays in top-left corner
- [ ] Image loads and displays (4:3 aspect ratio)
- [ ] Category label visible
- [ ] Dish name doesn't overflow
- [ ] Description truncates at 2 lines
- [ ] Price displays correctly
- [ ] Add button is clickable
- [ ] Hover effect works (desktop)
- [ ] Click opens product detail

### Product Detail Tests
```
Mobile  → Image above, details below ✓
Tablet  → Still stacked ✓
Desktop → Image left, details right ✓
```
- [ ] Back button works
- [ ] Product image displays fully
- [ ] Description box doesn't overflow
- [ ] Stats grid displays in 1 column (mobile) → 3 columns (desktop)
- [ ] Quantity controls are accessible
- [ ] Add to cart button works
- [ ] View cart button works

### Button Tests
- [ ] All buttons have minimum 44px height on mobile
- [ ] Text doesn't truncate
- [ ] Hover effects work on desktop
- [ ] Active/press states visible on mobile
- [ ] Colors are vibrant and visible
- [ ] Neon glow effects render

### Input/Form Tests
- [ ] Input fields are properly sized
- [ ] Placeholder text is visible
- [ ] Focus states work
- [ ] Cursor appears
- [ ] Text is readable
- [ ] No keyboard interference on mobile

---

## Visual Regression Tests

**Typography:**
- [ ] No text too large on mobile
- [ ] No text too small to read
- [ ] Line heights are appropriate
- [ ] Letter spacing looks right
- [ ] Text shadows render correctly

**Colors:**
- [ ] Cyan neon glow visible
- [ ] Magenta accents visible
- [ ] Yellow price tags readable
- [ ] Dark background shows contrast
- [ ] Text is legible on all backgrounds

**Spacing:**
- [ ] Section padding consistent (16px mobile, 40-60px desktop)
- [ ] Content not touching edges
- [ ] Gap between grid items appropriate
- [ ] Margins between sections visible
- [ ] No cramped or overly sparse layout

**Images:**
- [ ] All images load
- [ ] No broken image icons
- [ ] Aspect ratios maintained
- [ ] Filter effects apply
- [ ] Gradients overlay correctly

---

## Overflow/Scroll Tests

**Horizontal Overflow:**
- [ ] At 320px: No horizontal scrollbar
- [ ] At 480px: No horizontal scrollbar
- [ ] At 768px: No horizontal scrollbar
- [ ] At 1024px: No horizontal scrollbar
- [ ] At 1920px: No horizontal scrollbar

**Vertical Scroll:**
- [ ] Scrolls smoothly
- [ ] No jank or stuttering
- [ ] Navbar stays fixed at top
- [ ] Mobile menu scrolls correctly

**Touch/Click:**
- [ ] All buttons clickable
- [ ] No dead zones
- [ ] Touch targets are adequate
- [ ] No accidental double-clicks

---

## Accessibility Tests

**Touch Targets:**
- [ ] All buttons ≥ 44px high
- [ ] All interactive elements have adequate padding
- [ ] Links and buttons easily distinguishable

**Keyboard Navigation:**
- [ ] Tab through elements in logical order
- [ ] Focus states visible
- [ ] No keyboard traps
- [ ] Enter key activates buttons

**Color Contrast:**
- [ ] Text readable on background
- [ ] Neon colors have sufficient contrast
- [ ] Disabled states visible

**Responsive Text:**
- [ ] Pinch-zoom works (if enabled)
- [ ] Text zooming works in browser settings
- [ ] No text clipping at 200% zoom

---

## Browser Compatibility

Test on:
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Edge (Latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

---

## Performance Tests

- [ ] Page loads quickly
- [ ] No layout shifts on load
- [ ] Images load without quality loss
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks on scroll

---

## Final Sign-Off

**All tests passed?**
- [ ] YES - Website is ready for mobile!

**Issues found?**
- [ ] Print screen names and sizes
- [ ] Note the issue description
- [ ] Check console for JavaScript errors
- [ ] Verify CSS imports are loading

---

## Quick Mobile Verification (60 seconds)

1. **320px**: Scroll top to bottom → No horizontal scroll? ✓
2. **480px**: Tap navbar menu → Opens/closes? ✓
3. **768px**: Resize → Desktop menu appears? ✓
4. **1024px**: Click hero button → Works? ✓
5. **Menu page**: Scroll cards → Grid looks good? ✓
6. **Product page**: Stack layout → Two sections visible? ✓
7. **All pages**: No errors in console? ✓

---

## Debugging Tips

If something isn't working:

1. **Check DevTools**
   - Open DevTools (F12)
   - Look at Console tab for errors
   - Check Styles tab for applied CSS

2. **Check CSS Files**
   - Are new CSS files imported in main.jsx?
   - Are media queries correct?
   - Is specificity causing overrides?

3. **Clear Cache**
   - Hard refresh: Ctrl+F5
   - Clear browser cache
   - Close and reopen DevTools

4. **Check Breakpoints**
   - Set DevTools to exact screen size
   - Verify media query is triggering
   - Check if inline styles override media queries

5. **Mobile Test**
   - Use actual phone not just DevTools
   - Check landscape orientation
   - Test with real touch interactions

---

## Notes

- All responsive CSS is in `/src/styles/`
- Mobile-responsive.css is the main new file
- No component changes needed
- Safe to deploy - no breaking changes

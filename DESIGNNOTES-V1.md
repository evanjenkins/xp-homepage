# Design notes

## Revision 1 (01/24/17)

### General

- Trying to nail down the grid used here. Mentioned in Slack it was designed to fit 1140px. Moving the psd to this size and checking the max-row width would set this at 1305px. Using the Foundation grid, this doesn't allow for the exact pixel dimensions. Could I be provided column/gutter widths?
- Currently column width is roughly 76px with a 25px gutter. But the gutter widths are not consistent. IE.. spacing between active prizes is more than the latest news below.
- Ordering of the elements are different from mobile to desktop. IE: "Building the latest news" section comes after the MTP section. We can accomplish this if it was intentional, but from a maintainability standpoint same ordering would be beneficial.
- Some items are hidden on mobile. Beneficial to not hide content for mobile, IE "Active Prizes" last two blocks. Hero extra items... Can we maintain the same content.
- Font sizes are guestimates. I resized the psd to 1440px and tried to match sizes.
- What does the mobile navigation look like?

### Hero Section

- Desktop line wraps are at different lengths. How is this supposed to be controlled? 

### MTP Section

- Desktop version has 2 different font sizes for the header of that section. Intentional?
- Close button "X" seems to be just the Futura font's "X". Other buttons contain a font-awesome type icon, should we go that route instead?

### Active Prizes Section

- Title changes when opened on desktop.
- Mobile shows a quote from "Pele", desktop does not. We can hide for large, but want to verify this is the intention.
- Desktop images have different sizes in the knockout text. The idea was to get this all in html for better search. Can we standardize that?
- Desktop contains "Past Prizes" & "Future Prizes" as the last 2 elements...
- The last two blocks do not have knockouts text.

### See the latest news

- First item in design for desktop different then on mobile, assuming this is the same node just wrong title?
- Buttons for 2nd and 3rd item on mobile buttons read "READ ABOUT IT", rather than desktop's that is "READ ON"
- Dates are missing on desktop version.
- Tablet has two lines above the news items on the right. Desktop only has one.
- Text for desktop on 1st article has much longer description than mobile.
- Gutter from 1st article and 2nd article smaller than between the 2nd and 3rd.
- Currently images on desktop are squished until the grid is resolved.

### Become a part... Section

- Input padding-left changes from mobile to desktop.

### Footer

- Yellow border on desktop is gone. Intentional?

## More questions

- For hero, currently using an overlay for the image, this would allow content editors to upload the picture without providing the darkened overlay in Photoshop. Should we keep it this way or force editors to darken the image?
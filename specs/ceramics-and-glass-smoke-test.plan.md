# Ceramics and Glass Smoke Test Plan

## Application Overview

Comprehensive smoke test suite for ceramicsandglass.nl - An art website showcasing ceramic and glass works by Anne van der Waerden. The website includes portfolio pages, an e-commerce section for purchasing art pieces, and contact functionality. Tests verify core functionality including navigation, page loading, product catalog browsing, cart functionality, and contact form submission.

## Test Scenarios

### 1. Core Website Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. should load homepage and display main elements

**File:** `tests/core-navigation/homepage-load.spec.ts`

**Steps:**
  1. Navigate to https://ceramicsandglass.nl/
  2. Verify page title contains 'Anne van der Waerden'
  3. Verify main heading 'Anne van der Waerden' is visible
  4. Verify 'Ceramics and Glass' subtitle is present
  5. Verify navigation menu is visible with all main links
  6. Verify 'work in stock' link is present

**Expected Results:**
  - Page loads successfully without errors
  - Title displays 'Anne van der Waerden – Ceramics and Glass'
  - Main heading is prominently displayed
  - Subtitle clearly identifies the type of artwork
  - Navigation contains Introduction, About my work, Overview, CV, Stock, and Contact links
  - Stock link is clickable and accessible

#### 1.2. should navigate to all main pages successfully

**File:** `tests/core-navigation/navigation-links.spec.ts`

**Steps:**
  1. Navigate to homepage
  2. Click on 'About my work' link
  3. Verify About page loads with autobiographical content
  4. Navigate to 'Overview' page
  5. Verify Overview page displays work samples
  6. Navigate to 'CV' page
  7. Verify CV page shows professional history
  8. Navigate to 'Stock' page
  9. Verify Stock page shows product categories
  10. Navigate to 'Contact' page
  11. Verify Contact page shows contact information and form

**Expected Results:**
  - All navigation links work correctly
  - About page contains autobiographical sketch and work description
  - Overview page displays portfolio of artwork
  - CV page shows professional background
  - Stock page displays multiple product categories with item counts
  - Contact page shows address, email, and contact form

### 2. Product Catalog and Shopping

**Seed:** `tests/seed.spec.ts`

#### 2.1. should browse product categories and view items

**File:** `tests/shopping/browse-products.spec.ts`

**Steps:**
  1. Navigate to Stock page
  2. Verify multiple product categories are displayed
  3. Click on 'ON THE WHEEL 1965-1985' category
  4. Verify category page displays individual items
  5. Check that items show images, titles, and availability status
  6. Verify some items display prices and 'Add to cart' buttons
  7. Verify some items show 'Not available' status

**Expected Results:**
  - Stock page shows 18+ product categories with item counts
  - Category page displays '12 results' for ON THE WHEEL category
  - Individual products show clear images and descriptions
  - Available items display prices (€250-€300 range observed)
  - Add to cart functionality is present for available items
  - Sold or unavailable items clearly marked as 'Not available'

#### 2.2. should add item to cart and proceed to checkout

**File:** `tests/shopping/add-to-cart.spec.ts`

**Steps:**
  1. Navigate to ON THE WHEEL 1965-1985 category
  2. Find an available item with 'Add to cart' button (e.g., 'Objects' for €300)
  3. Click 'Add to cart' button
  4. Verify success message appears
  5. Click 'View cart' link from success message
  6. Verify cart page shows added item
  7. Check cart displays correct item name, price, and quantity
  8. Verify cart totals are calculated correctly
  9. Verify 'Proceed to checkout' button is present

**Expected Results:**
  - Item successfully added to cart with confirmation message
  - Cart page titled 'Reservations' displays correctly
  - Cart shows 'Objects' item with €300 price
  - Quantity defaults to 1 and is editable
  - Subtotal and Total both show €300
  - Shipping shows 'Pickup appointment' option
  - Proceed to checkout button is functional

### 3. Contact and Communication

**Seed:** `tests/seed.spec.ts`

#### 3.1. should display contact information correctly

**File:** `tests/contact/contact-info.spec.ts`

**Steps:**
  1. Navigate to Contact page
  2. Verify page title shows 'Contact'
  3. Check contact details are displayed
  4. Verify email address is provided
  5. Verify physical address is complete
  6. Check contact form is present with all required fields

**Expected Results:**
  - Contact page loads with proper heading
  - Shows Anne van der Waerden's name prominently
  - Displays complete address: Rozenstraat 89, 1016 NN Amsterdam, The Netherlands
  - Email address info@annevanderwaerden.nl is visible
  - Contact form includes Name, Email, Subject, and Message fields
  - Required fields are marked with asterisks (*)

#### 3.2. should validate contact form fields

**File:** `tests/contact/contact-form-validation.spec.ts`

**Steps:**
  1. Navigate to Contact page
  2. Attempt to submit empty form
  3. Fill in Name field with test data
  4. Fill in Email field with valid email
  5. Fill in Subject field with test subject
  6. Fill in Message field with test message
  7. Click 'Send message' button
  8. Verify form submission behavior

**Expected Results:**
  - Form validates required fields before submission
  - Name field accepts text input
  - Email field validates email format
  - Subject field accepts optional text
  - Message field accepts longer text content
  - Send button is clickable when form is properly filled
  - Form provides appropriate feedback on submission attempt

### 4. Content and Media Display

**Seed:** `tests/seed.spec.ts`

#### 4.1. should display artwork images and descriptions

**File:** `tests/content/artwork-display.spec.ts`

**Steps:**
  1. Navigate to homepage
  2. Verify artwork images are loaded and visible
  3. Check that artwork descriptions include titles and dates
  4. Navigate to About my work page
  5. Verify biographical content and work philosophy is displayed
  6. Check that embedded artwork images load properly
  7. Verify links to external sites (Kees Hoogendam) work correctly

**Expected Results:**
  - Homepage displays multiple artwork images with proper descriptions
  - Artwork titles, dimensions, years, and collection info are shown
  - About page contains comprehensive biographical content
  - Images throughout the site load without broken image indicators
  - External links open correctly (e.g., keeshoogendampottenbakker.nl)
  - Content is well-formatted and readable

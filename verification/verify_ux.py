from playwright.sync_api import sync_playwright

def verify_contact_ux():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to contact page
        print("Navigating to contact page...")
        page.goto("http://localhost:3000/contact")

        # Verify labels exist
        print("Verifying labels...")
        page.wait_for_selector("label[for='name']")
        page.wait_for_selector("label[for='email']")
        page.wait_for_selector("label[for='message']")

        # Verify required asterisks
        print("Verifying asterisks...")
        asterisks = page.locator("span[aria-label='required']")
        print(f"Found {asterisks.count()} required indicators")

        # Take screenshot of empty form with labels
        page.screenshot(path="verification/contact_form_empty.png")

        # Fill form
        print("Filling form...")
        page.fill("#name", "Palette Tester")
        page.fill("#email", "palette@example.com")
        page.fill("#message", "Testing the UX improvements.")

        # Submit
        print("Submitting...")
        page.click("button[type='submit']")

        # Verify loading state (might be too fast to catch, but we try)
        # Note: We added 1000ms delay, so we might catch it if we check immediately

        # Wait for success message
        print("Waiting for success message...")
        page.wait_for_selector("div[role='alert']")

        # Take screenshot of success state
        page.screenshot(path="verification/contact_form_success.png")

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    try:
        verify_contact_ux()
    except Exception as e:
        print(f"Error: {e}")
        exit(1)

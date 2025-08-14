from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the "Layanan" page
    page.goto("http://127.0.0.1:8080/layanan")
    page.wait_for_load_state("networkidle")

    # Screenshot of the service list
    page.screenshot(path="jules-scratch/verification/layanan_numbering.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

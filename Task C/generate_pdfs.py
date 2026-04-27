import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.pdfgen import canvas
from reportlab.lib import colors

TARGET_DIR = os.path.dirname(os.path.abspath(__file__))

def create_tree_structure_pdf():
    pdf_path = os.path.join(TARGET_DIR, "TaskC_TreeStructure.pdf")
    c = canvas.Canvas(pdf_path, pagesize=letter)
    
    # Page 1: menu.xml
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, 750, "1. Tree Structure for menu.xml")
    
    c.setFont("Courier", 11)
    text = """
menu
|-- meals
|   |-- meal (Item 1)
|       |-- name
|       |-- price
|       |-- description
|       |-- image
|   |-- meal (Items 2, 3, 4...)
|
|-- beverages
    |-- category (Coffee and hot chocolates)
    |   |-- beverage
    |       |-- size
    |       |-- price
    |       |-- description
    |   |-- beverage (other sizes...)
    |
    |-- category (Other beverages)
        |-- beverage
            |-- name
            |-- price
        |-- beverage (other items...)
"""
    
    y = 710
    for line in text.strip().split('\n'):
        c.drawString(50, y, line)
        y -= 14
        
    c.showPage()
    
    # Page 2: branches.xml
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, 750, "2. Tree Structure for branches.xml")
    
    c.setFont("Courier", 11)
    text2 = """
branches
|-- branch (Location 1: Devonshire St)
|   |-- address
|   |-- contact_number
|   |-- opening_hours
|   |-- map_link
|-- branch (Location 2: Pitt St)
|   |-- address
|   |-- contact_number
|   |-- opening_hours
|   |-- map_link
|-- branch (Location 3: Alfred Street)
    |-- address
    |-- contact_number
    |-- opening_hours
    |-- map_link
"""
    
    y = 710
    for line in text2.strip().split('\n'):
        c.drawString(50, y, line)
        y -= 14
        
    c.save()
    print(f"Created {pdf_path}")

def draw_wireframe_box(c, x, y, width, height, label="", has_x=False):
    c.setStrokeColor(colors.black)
    c.setLineWidth(1)
    c.rect(x, y, width, height)
    if has_x:
        c.setStrokeColor(colors.lightgrey)
        c.line(x, y, x + width, y + height)
        c.line(x, y + height, x + width, y)
    if label:
        c.setFillColor(colors.black)
        c.setFont("Helvetica", 12)
        c.drawCentredString(x + width/2, y + height/2 - 4, label)

def create_webdesign_pdf():
    pdf_path = os.path.join(TARGET_DIR, "TaskC_WebDesign.pdf")
    c = canvas.Canvas(pdf_path, pagesize=landscape(letter))
    width, height = landscape(letter)
    
    # --- Page 1: Home Page Wireframe ---
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 40, "Wireframe: Home Page")
    
    # Header
    draw_wireframe_box(c, 50, height - 100, width - 100, 50)
    c.drawString(60, height - 80, "[ Logo ]")
    c.drawRightString(width - 60, height - 80, "[ Nav Links: Home | Menu | Contact ]")
    
    # Hero Section
    draw_wireframe_box(c, 50, height - 320, width - 100, 200, "Hero Image Placeholder", has_x=True)
    draw_wireframe_box(c, width/2 - 100, height - 240, 200, 40, "Main Heading / Title")
    
    # Content Section (Split layout)
    draw_wireframe_box(c, 50, height - 480, (width - 120)/2, 140, "Image Placeholder", has_x=True)
    draw_wireframe_box(c, 50 + (width - 120)/2 + 20, height - 480, (width - 120)/2, 140, "About Us Text Content")
    
    # Footer
    draw_wireframe_box(c, 50, height - 560, width - 100, 60, "Footer: Copyright & Privacy Links")
    c.showPage()
    
    # --- Page 2: Menu Page Wireframe ---
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 40, "Wireframe: Menu Page")
    
    # Header
    draw_wireframe_box(c, 50, height - 100, width - 100, 50)
    c.drawString(60, height - 80, "[ Logo ]")
    c.drawRightString(width - 60, height - 80, "[ Nav Links: Home | Menu | Contact ]")
    
    # Menu Title
    draw_wireframe_box(c, width/2 - 100, height - 150, 200, 30, "Page Title: Our Menu")
    
    # Meals Section
    c.drawString(50, height - 180, "Section: Meals")
    draw_wireframe_box(c, 50, height - 320, width - 100, 130)
    c.drawString(60, height - 210, "Table Headers: Image | Item Name | Description | Price")
    draw_wireframe_box(c, 60, height - 250, 60, 30, "img", has_x=True)
    c.drawString(130, height - 240, "[Meal 1 Details]")
    draw_wireframe_box(c, 60, height - 300, 60, 30, "img", has_x=True)
    c.drawString(130, height - 290, "[Meal 2 Details]")
    
    # Beverages Section
    c.drawString(50, height - 350, "Section: Beverages")
    draw_wireframe_box(c, 50, height - 490, width - 100, 130)
    c.drawString(60, height - 380, "Table Headers: Image | Item Name | Description | Price")
    draw_wireframe_box(c, 60, height - 420, 60, 30, "img", has_x=True)
    c.drawString(130, height - 410, "[Subcategory: Coffee & Hot Chocolates]")
    c.drawString(130, height - 430, "[Beverage Details & Sizes]")
    
    # Footer
    draw_wireframe_box(c, 50, height - 560, width - 100, 60, "Footer: Copyright & Privacy Links")
    c.showPage()
    
    # --- Page 3: Contact Page Wireframe ---
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, height - 40, "Wireframe: Contact Us Page")
    
    # Header
    draw_wireframe_box(c, 50, height - 100, width - 100, 50)
    c.drawString(60, height - 80, "[ Logo ]")
    c.drawRightString(width - 60, height - 80, "[ Nav Links: Home | Menu | Contact ]")
    
    # Form and Branches Split Layout
    draw_wireframe_box(c, 50, height - 480, (width - 120)/2, 350)
    c.drawString(60, height - 150, "Contact Form:")
    draw_wireframe_box(c, 60, height - 190, (width - 120)/2 - 20, 30, "[Input: First Name]")
    draw_wireframe_box(c, 60, height - 230, (width - 120)/2 - 20, 30, "[Input: Last Name]")
    draw_wireframe_box(c, 60, height - 270, (width - 120)/2 - 20, 30, "[Input: Email]")
    draw_wireframe_box(c, 60, height - 310, (width - 120)/2 - 20, 30, "[Input: Subject]")
    draw_wireframe_box(c, 60, height - 420, (width - 120)/2 - 20, 100, "[Textarea: Message]")
    draw_wireframe_box(c, 60, height - 470, 100, 40, "[Submit Button]")
    
    draw_wireframe_box(c, 50 + (width - 120)/2 + 20, height - 480, (width - 120)/2, 350)
    c.drawString(60 + (width - 120)/2 + 20, height - 150, "Branch Locations:")
    draw_wireframe_box(c, 60 + (width - 120)/2 + 20, height - 240, (width - 120)/2 - 20, 80, "[Branch 1 Details & Map Link]")
    draw_wireframe_box(c, 60 + (width - 120)/2 + 20, height - 340, (width - 120)/2 - 20, 80, "[Branch 2 Details & Map Link]")
    draw_wireframe_box(c, 60 + (width - 120)/2 + 20, height - 440, (width - 120)/2 - 20, 80, "[Branch 3 Details & Map Link]")
    
    # Footer
    draw_wireframe_box(c, 50, height - 560, width - 100, 60, "Footer: Copyright & Privacy Links")
    
    c.save()
    print(f"Created {pdf_path}")

if __name__ == "__main__":
    create_tree_structure_pdf()
    create_webdesign_pdf()

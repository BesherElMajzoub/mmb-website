from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.units import cm, mm
from reportlab.pdfgen import canvas
import os

# Brand Colors
BRAND_GREEN = colors.HexColor("#00a259")
BRAND_DARK = colors.HexColor("#151716")
BRAND_GREY = colors.HexColor("#f5f5f5")

def create_catalog():
    doc = SimpleDocTemplate(
        "client/public/mmb_product_catalog.pdf",
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=BRAND_DARK,
        spaceAfter=30,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=BRAND_GREEN,
        spaceAfter=20,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.black,
        spaceAfter=10
    )
    
    spec_header_style = ParagraphStyle(
        'SpecHeader',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.white,
        fontName='Helvetica-Bold'
    )

    story = []

    # --- COVER PAGE ---
    # Logo
    if os.path.exists("client/public/images/logo.png"):
        im = Image("client/public/images/logo.png", width=6*cm, height=2*cm)
        im.hAlign = 'LEFT'
        story.append(im)
    
    story.append(Spacer(1, 4*cm))
    
    story.append(Paragraph("PRODUCT CATALOG 2026", title_style))
    story.append(Paragraph("German Engineering for Pure Water Solutions", subtitle_style))
    
    story.append(Spacer(1, 2*cm))
    
    # Cover Image
    if os.path.exists("client/public/images/engineer-hero.jpg"):
        im = Image("client/public/images/engineer-hero.jpg", width=16*cm, height=10*cm)
        story.append(im)
    
    story.append(PageBreak())

    # --- INTRODUCTION ---
    story.append(Paragraph("About MMB", title_style))
    intro_text = """
    At Morsbach Maschinen Bau GmbH (MMB), we combine the heritage of German precision with modern innovation to deliver superior pumping systems. 
    We are not just a manufacturer; we are a partner dedicated to efficiency and durability.
    <br/><br/>
    <b>Engineering Excellence:</b> Rooted in our German origins, every unit is built to rigorous standards.
    <br/>
    <b>Premium Material Construction:</b> We prioritize longevity by utilizing high-grade Stainless Steel.
    <br/>
    <b>Dedicated to Purity:</b> Our technology is specifically designed to maintain water safety and hygiene.
    """
    story.append(Paragraph(intro_text, body_style))
    story.append(PageBreak())

    # --- PRODUCTS ---
    products = [
        {
            "name": "MMB 6S Series Submersible Pumps",
            "category": "Submersible Pumps",
            "desc": "The 6S Series is engineered for maximum durability and efficiency in deep well applications. Constructed entirely from high-grade stainless steel.",
            "image": "client/public/images/submersible-pump.jpg",
            "specs": [
                ["Parameter", "Value", "Unit"],
                ["Flow Rate", "Up to 80", "m³/h"],
                ["Head", "Up to 400", "m"],
                ["Power", "0.37 - 37", "kW"],
                ["Efficiency", "Up to 84", "%"],
                ["Material", "AISI 304 / 316", "Stainless Steel"]
            ]
        },
        {
            "name": "MMB 4S Series Submersible Pumps",
            "category": "Submersible Pumps",
            "desc": "Compact yet powerful, the 4S Series delivers reliable performance for residential and small-scale agricultural needs.",
            "image": "client/public/images/submersible-pump.jpg",
            "specs": [
                ["Parameter", "Value", "Unit"],
                ["Flow Rate", "Up to 24", "m³/h"],
                ["Head", "Up to 300", "m"],
                ["Power", "0.37 - 7.5", "kW"],
                ["Diameter", "4", "inches"],
                ["Material", "AISI 304", "Stainless Steel"]
            ]
        },
        {
            "name": "MMB MV Vertical Multistage Pumps",
            "category": "Multistage Pumps",
            "desc": "The MV Series represents the pinnacle of high-pressure pumping technology. Its vertical in-line design saves space while delivering exceptional pressure.",
            "image": "client/public/images/multistage-pump.jpg",
            "specs": [
                ["Parameter", "Value", "Unit"],
                ["Flow Rate", "Up to 120", "m³/h"],
                ["Head", "Up to 320", "m"],
                ["Max Pressure", "30", "bar"],
                ["Liquid Temp", "-15 to +120", "°C"],
                ["Flange", "DIN / ANSI", "Standard"]
            ]
        },
        {
            "name": "MMB M-Series Submersible Motors",
            "category": "Motors",
            "desc": "MMB submersible motors are the heart of our pumping systems. Designed for continuous duty in submerged conditions.",
            "image": "client/public/images/submersible-pump.jpg", # Placeholder
            "specs": [
                ["Parameter", "Value", "Unit"],
                ["Power Range", "0.37 - 110", "kW"],
                ["Voltage", "220 - 415", "V"],
                ["Frequency", "50 / 60", "Hz"],
                ["Protection", "IP68", "Class"],
                ["Insulation", "Class F", "Standard"]
            ]
        }
    ]

    for product in products:
        story.append(Paragraph(product["category"], subtitle_style))
        story.append(Paragraph(product["name"], title_style))
        
        # Layout: Image Left, Text Right (Simulated with Table)
        img_path = product["image"]
        if os.path.exists(img_path):
            img = Image(img_path, width=6*cm, height=8*cm)
            img.hAlign = 'LEFT'
        else:
            img = Paragraph("Image not available", body_style)

        desc = Paragraph(product["desc"], body_style)
        
        # Specs Table
        spec_data = product["specs"]
        t = Table(spec_data, colWidths=[5*cm, 4*cm, 3*cm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), BRAND_DARK),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), BRAND_GREY),
            ('GRID', (0, 0), (-1, -1), 1, colors.white),
            ('PADDING', (0, 0), (-1, -1), 6),
        ]))

        story.append(desc)
        story.append(Spacer(1, 1*cm))
        
        # Image and Table side by side or stacked
        story.append(img)
        story.append(Spacer(1, 1*cm))
        story.append(t)
        
        story.append(PageBreak())

    # --- CONTACT ---
    story.append(Paragraph("Contact Us", title_style))
    contact_info = """
    <b>Morsbach Maschinen Bau GmbH</b><br/>
    Industriestraße 15<br/>
    51597 Morsbach, Germany<br/><br/>
    Phone: +49 (0) 2294 123456<br/>
    Email: contact-us@mmbgermany.com<br/>
    Web: www.mmb-germany.com
    """
    story.append(Paragraph(contact_info, body_style))

    doc.build(story)
    print(f"Catalog generated at: client/public/mmb_product_catalog.pdf")

if __name__ == "__main__":
    create_catalog()

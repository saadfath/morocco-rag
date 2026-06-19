"""Convert the Morocco procedures Excel file to procedures.json"""
import json
import openpyxl
import sys

EXCEL_PATH = "../Downloads/morocco_admin_procedures_v2.xlsx"

def parse(path=EXCEL_PATH):
    wb = openpyxl.load_workbook(path)
    ws = wb["Procedures"]
    rows = list(ws.iter_rows(values_only=True))
    headers = rows[0]
    procedures = []
    for row in rows[1:]:
        r = dict(zip(headers, row))
        # Build a single searchable text chunk per procedure
        steps = " ".join(
            str(r[f"step_{i}"]) for i in range(1, 6) if r.get(f"step_{i}")
        )
        chunk = (
            f"Procédure: {r['name_fr']} | {r['name_en']}\n"
            f"Catégorie: {r['category']} | Événement: {r['life_event']}\n"
            f"Organisation: {r['organization']}\n"
            f"Documents requis: {r['documents_required']}\n"
            f"Frais: {r['fees_mad']} MAD | Délai: {r['processing_days']} jours\n"
            f"En ligne: {r['online_available']} | Physique: {r['physical_required']}\n"
            f"Étapes: {steps}\n"
            f"Notes: {r['notes']}\n"
            f"Portail: {r['portal_url']} | Lien direct: {r['procedure_url']}"
        )
        procedures.append({
            "id": r["id"],
            "name_fr": r["name_fr"],
            "name_ar": r["name_ar"],
            "name_en": r["name_en"],
            "category": r["category"],
            "life_event": r["life_event"],
            "organization": r["organization"],
            "portal_url": r["portal_url"],
            "procedure_url": r["procedure_url"],
            "documents_required": r["documents_required"],
            "fees_mad": r["fees_mad"],
            "processing_days": r["processing_days"],
            "online_available": r["online_available"],
            "steps": [r[f"step_{i}"] for i in range(1, 6) if r.get(f"step_{i}")],
            "notes": r["notes"],
            "chunk": chunk,
        })
    return procedures

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else EXCEL_PATH
    data = parse(path)
    with open("procedures.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ Parsed {len(data)} procedures → procedures.json")

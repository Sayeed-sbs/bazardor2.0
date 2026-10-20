export const BASE = "https://openapi.programming-hero.com/api/bazardor";

const unitFull = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const unitShort = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function toNum(value) {
  if (value === undefined || value === null) return 0;
  const bengali = "০১২৩৪৫৬৭৮৯";
  const text = String(value)
    .replace(/[০-৯]/g, (d) => bengali.indexOf(d))
    .replace(/,/g, "");
  const number = Number(text);
  return isNaN(number) ? 0 : number;
}

export function bn(value) {
  return Number(value).toLocaleString("bn-BD");
}

export function getList(json) {
  if (Array.isArray(json)) return json;
  return json.data || [];
}

export function fixProduct(p) {
  let change = 0;
  if (p.change) {
    const size = Math.abs(toNum(p.change.pct));
    if (p.change.dir === "up") change = size;
    if (p.change.dir === "down") change = -size;
  }

  const markets = (p.markets || []).map((m) => ({
    name: m.market,
    division: m.division,
    min: toNum(m.min),
    max: toNum(m.max),
  }));

  return {
    id: p.id,
    slug: p.slug,
    name: p.nameBn,
    emoji: p.image,
    unit: unitFull[p.unit] || p.unit,
    unitShort: unitShort[p.unit] || p.unit,
    price: toNum(p.today),
    yesterday: toNum(p.yesterday),
    lastWeek: toNum(p.lastWeek),
    lastMonth: toNum(p.lastMonth),
    change: change,
    categoryName: p.categoryNameBn,
    categorySlug: p.category,
    markets: markets,
  };
}

export function fixCategory(c) {
  return {
    slug: c.slug || c.id,
    name: c.nameBn,
    icon: c.icon,
  };
}
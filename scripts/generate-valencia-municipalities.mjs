import { writeFileSync } from 'fs'

// [Nombre en Español, Nombre en Valenciano, Denominación oficial]
const RAW = [
['Ademuz','Ademús','Ademuz'],
['Ador','Ador','Ador'],
['Adzaneta de Albaida',"Atzeneta d'Albaida","Atzeneta d'Albaida"],
['Agullent','Agullent','Agullent'],
['Alacuás','Alaquàs','Alaquàs'],
['Albaida','Albaida','Albaida'],
['Albal','Albal','Albal'],
['Albalat de la Ribera','Albalat de la Ribera','Albalat de la Ribera'],
['Albalat de Taronchers','Albalat dels Tarongers','Albalat dels Tarongers'],
['Albalat dels Sorells','Albalat dels Sorells','Albalat dels Sorells'],
['Alberique','Alberic','Alberic'],
['Alborache','Alboraig','Alborache'],
['Alboraya','Alboraia','Alboraya'],
['Albuixech','Albuixec','Albuixech'],
['Alcácer','Alcàsser','Alcácer'],
['Alcántara de Júcar','Alcàntera de Xúquer','Alcàntera de Xúquer'],
['Alcira','Alzira','Alzira'],
['Alcublas','Les Alcubles','Alcublas'],
['Alcudia de Carlet',"L'Alcúdia","L'Alcúdia"],
['Alcudia de Crespíns',"L'Alcúdia de Crespìns","L'Alcúdia de Crespìns"],
['Aldaya','Aldaia','Aldaia'],
['Alfafar','Alfafar','Alfafar'],
['Alfahuir','Alfauir','Alfauir'],
['Alfara de Algimia',"Alfara d'Algimia",'Alfara de Algimia'],
['Alfara del Patriarca','Alfara del Patriarca','Alfara del Patriarca'],
['Alfarp','Alfarb','Alfarp'],
['Alfarrasí','Alfarrassí','Alfarrasí'],
['Algar de Palancia','Algar','Algar de Palancia'],
['Algemesí','Algemesí','Algemesí'],
['Algimia de Alfara','Algimia de la Baronia','Algimia de Alfara'],
['Alginet','Alginet','Alginet'],
['Almácera','Almàssera','Almàssera'],
['Almiserat','Almiserà','Almiserà'],
['Almoines','Almoines','Almoines'],
['Almusafes','Almussafes','Almussafes'],
['Alpuente','Alpont','Alpuente'],
['Alquería de la Condesa',"L'Alqueria de la Comtessa","L'Alqueria de la Comtessa"],
['Andilla','Andilla','Andilla'],
['Anna','Anna','Anna'],
['Antella','Antella','Antella'],
['Aras de los Olmos',"Ares d'Alpont",'Aras de los Olmos'],
['Ayelo de Malferit','Aielo de Malferit','Aielo de Malferit'],
['Ayelo de Rugat','Aielo de Rugat','Ayelo de Rugat'],
['Ayora','Aiora','Ayora'],
['Barcheta','Barxeta','Barxeta'],
['Bárig','Barx','Barx'],
['Bélgida','Bèlgida','Bèlgida'],
['Bellreguart','Bellreguard','Bellreguard'],
['Bellús','Bellús','Bellús'],
['Benagéber','Benaixeve','Benagéber'],
['Benaguacil','Benaguasil','Benaguasil'],
['Benavites','Benavites','Benavites'],
['Benegida','Beneixida','Beneixida'],
['Benetúser','Benetússer','Benetússer'],
['Beniarjó','Beniarjó','Beniarjó'],
['Beniatjar','Beniatjar','Beniatjar'],
['Benicolet','Benicolet','Benicolet'],
['Benicull de Júcar','Benicull de Xúquer','Benicull de Xúquer'],
['Benifairó de la Valldigna','Benifairó de la Valldigna','Benifairó de la Valldigna'],
['Benifairó de los Valles','Benifairó de les Valls','Benifairó de les Valls'],
['Benifayó','Benifaió','Benifaió'],
['Beniflá','Beniflà','Beniflá'],
['Benigánim','Benigànim','Benigànim'],
['Benimodo','Benimodo','Benimodo'],
['Benimuslem','Benimuslem','Benimuslem'],
['Beniparrell','Beniparrell','Beniparrell'],
['Benirredrá','Benirredrà','Benirredrà'],
['Benisanó','Benissanó','Benisanó'],
['Benisoda','Benissoda','Benissoda'],
['Benisuera','Benissuera','Benisuera'],
['Bétera','Bétera','Bétera'],
['Bicorp','Bicorb','Bicorp'],
['Bocairente','Bocairent','Bocairent'],
['Bolbaite','Bolbait','Bolbaite'],
['Bonrepós y Mirambell','Bonrepòs i Mirambell','Bonrepòs i Mirambell'],
['Bufali','Bufali','Bufali'],
['Bugarra','Bugarra','Bugarra'],
['Buñol','Bunyol','Buñol'],
['Burjasot','Burjassot','Burjassot'],
['Calles','Calles','Calles'],
['Camporrobles','Camporrobles','Camporrobles'],
['Canals','Canals','Canals'],
['Canet de Berenguer',"Canet d'En Berenguer","Canet d'En Berenguer"],
['Carcagente','Carcaixent','Carcaixent'],
['Cárcer','Càrcer','Càrcer'],
['Carlet','Carlet','Carlet'],
['Carrícola','Carrícola','Carrícola'],
['Casas Altas','Casas Altas','Casas Altas'],
['Casas Bajas','Casas Bajas','Casas Bajas'],
['Casinos','Casinos','Casinos'],
['Castellón de Rugat','Castelló de Rugat','Castelló de Rugat'],
['Castellonet','Castellonet de la Conquesta','Castellonet de la Conquesta'],
['Castielfabib','Castellfabib','Castielfabib'],
['Catadau','Catadau','Catadau'],
['Catarroja','Catarroja','Catarroja'],
['Caudete de las Fuentes','Caudete de las Fuentes','Caudete de las Fuentes'],
['Cerdá','Cerdà','Cerdà'],
['Chella','Xella','Chella'],
['Chelva','Xelva','Chelva'],
['Chera','Xera','Chera'],
['Cheste','Xest','Cheste'],
['Chirivella','Xirivella','Xirivella'],
['Chiva','Xiva','Chiva'],
['Chulilla','Xulella','Chulilla'],
['Cofrentes','Cofrents','Cofrentes'],
['Corbera','Corbera','Corbera'],
['Cortes de Pallás','Cortes de Pallars','Cortes de Pallás'],
['Cotes','Cotes','Cotes'],
['Cuart de les Valls','Quart de les Valls','Quart de les Valls'],
['Cuart de Poblet','Quart de Poblet','Quart de Poblet'],
['Cuartell','Quartell','Quartell'],
['Cuatretonda','Quatretonda','Quatretonda'],
['Cullera','Cullera','Cullera'],
['Daimuz','Daimús','Daimús'],
['Domeño','Domenyo','Domeño'],
['Dos Aguas','Dosaigües','Dos Aguas'],
['La Eliana',"L'Eliana","L'Eliana"],
['Emperador','Emperador','Emperador'],
['Enguera','Ènguera','Enguera'],
['Énova',"L'Ènova","L'Ènova"],
['Estivella','Estivella','Estivella'],
['Estubeny','Estubeny','Estubeny'],
['Faura','Faura','Faura'],
['Favareta','Favara','Favara'],
['Fontanares','Fontanars dels Alforins','Fontanars dels Alforins'],
['Fortaleny','Fortaleny','Fortaleny'],
['Foyos','Foios','Foios'],
['Fuente Encarroz',"La Font d'En Carròs","La Font d'En Carròs"],
['Fuente la Higuera','La Font de la Figuera','La Font de la Figuera'],
['Fuenterrobles','Fuenterrobles','Fuenterrobles'],
['Gabarda','Gavarda','Gavarda'],
['Gandía','Gandia','Gandia'],
['Gátova','Gàtova','Gátova'],
['Genovés','Genovés','Genovés'],
['Gestalgar','Xestalgar','Gestalgar'],
['Gilet','Gilet','Gilet'],
['Godella','Godella','Godella'],
['Godelleta','Godelleta','Godelleta'],
['La Granja de la Costera','La Granja de la Costera','La Granja de la Costera'],
['Guadasequies','Guadassèquies','Guadasequies'],
['Guadasuar','Guadassuar','Guadassuar'],
['Guardamar','Guardamar de la Safor','Guardamar de la Safor'],
['Higueruelas','Figueroles','Higueruelas'],
['Jalance','Xalans','Jalance'],
['Jaraco','Xeraco','Xeraco'],
['Jarafuel','Xarafull','Jarafuel'],
['Játiva','Xàtiva','Xátiva'],
['Jeresa','Xeresa','Xeresa'],
['Liria','Llíria','Llíria'],
['Llanera de Ranes','Llanera de Ranes','Llanera de Ranes'],
['Llaurí','Llaurí','Llaurí'],
['Llombay','Llombai','Llombai'],
['Llosa de Ranes','La Llosa de Ranes','La Llosa de Ranes'],
['Loriguilla','Loriguilla','Loriguilla'],
['Losa del Obispo','Llosa del Bisbe','Losa del Obispo'],
['Luchente','Llutxent','Llutxent'],
['Lugar Nuevo de Fenollet',"Llocnou d'En Fenollet","Llocnou d'En Fenollet"],
['Lugar Nuevo de la Corona','Poblenou de la Corona','Lugar Nuevo de la Corona'],
['Lugar Nuevo de San Jerónimo','Llocnou de Sant Jeroni','Llocnou de Sant Jeroni'],
['Macastre','Macastre','Macastre'],
['Manises','Manises','Manises'],
['Manuel','Manuel','Manuel'],
['Marines','Marines','Marines'],
['Masalavés','Massalavés','Masalavés'],
['Masalfasar','Massalfassar','Massalfassar'],
['Masamagrell','Massamagrell','Massamagrell'],
['Masanasa','Massanassa','Massanassa'],
['Meliana','Meliana','Meliana'],
['Millares','Millars','Millares'],
['Miramar','Miramar','Miramar'],
['Mislata','Mislata','Mislata'],
['Mogente','Moixent','Moixent / Mogente'],
['Moncada','Montcada','Moncada'],
['Monserrat','Montserrat','Montserrat'],
['Montaverner','Montaverner','Montaverner'],
['Montesa','Montesa','Montesa'],
['Montichelvo','Montixelvo','Montichelvo'],
['Montroy','Montroi','Montroy'],
['Museros','Museros','Museros'],
['Náquera','Nàquera','Náquera'],
['Navarrés','Navarrés','Navarrés'],
['Novelé','Novetlè','Novetlè / Novelé'],
['Oliva','Oliva','Oliva'],
['Ollería',"L'Olleria","L'Olleria"],
['Olocau','Olocau','Olocau'],
['Onteniente','Ontinyent','Ontinyent'],
['Otos','Otos','Otos'],
['Paiporta','Paiporta','Paiporta'],
['Palma de Gandía','Palma de Gandia','Palma de Gandía'],
['Palomar','Palomar','El Palomar'],
['Paterna','Paterna','Paterna'],
['Pedralba','Pedralba','Pedralba'],
['Petrés','Petrés','Petrés'],
['Picaña','Picanya','Picanya'],
['Picasent','Picassent','Picassent'],
['Piles','Piles','Piles'],
['Pinet','Pinet','Pinet'],
['Poliñá de Júcar','Polinyà de Xúquer','Polinyà de Xúquer'],
['Potríes','Potries','Potríes'],
['Puebla de Farnáls','Pobla de Farnals','La Pobla de Farnals'],
['Puebla de San Miguel','La Pobla de Sant Miquel','Puebla de San Miguel'],
['Puebla de Vallbona','La Pobla de Vallbona','La Pobla de Vallbona'],
['Puebla del Duc','La Pobla del Duc','La Pobla del Duc'],
['Puebla Larga','La Pobla Llarga','La Pobla Llarga'],
['Puig','Puig','El Puig'],
['Puzol','Puçol','Puçol'],
['Quesa','Quesa','Quesa'],
['Rafelbuñol','Rafelbunyol','Rafelbunyol / Rafelbuñol'],
['Rafelcofer','Rafelcofer','Rafelcofer'],
['Rafelguaraf','Rafelguaraf','Rafelguaraf'],
['Ráfol de Salem','El Ràfol de Salem','Ráfol de Salem'],
['Real de Gandía','Real de Gandia','Real de Gandía'],
['Real de Montroy','Real de Montroi','Real de Montroi'],
['Requena','Requena','Requena'],
['Ribarroja del Turia','Riba-roja de Túria','Riba-roja de Túria'],
['Riola','Riola','Riola'],
['Rocafort','Rocafort','Rocafort'],
['Rotglá y Corbera','Rotglà i Corberà','Rotglà i Corberà'],
['Rótova','Ròtova','Rótova'],
['Rugat','Rugat','Rugat'],
['Sagunto','Sagunt','Sagunt / Sagunto'],
['Salem','Salem','Salem'],
['San Antonio de Benagéber','Sant Antoni de Benaixeve','San Antonio de Benagéber'],
['San Juan de Énova',"Sant Joan de l'Ènova",'San Juan de Énova'],
['Sedaví','Sedaví','Sedaví'],
['Segart','Segart','Segart'],
['Sellent','Sellent','Sellent'],
['Sempere','Sant Pere','Sempere'],
['Señera','Senyera','Senyera'],
['Serra','Serra','Serra'],
['Siete Aguas','Setaigües','Siete Aguas'],
['Silla','Silla','Silla'],
['Simat de Valldigna','Simat de la Valldigna','Simat de la Valldigna'],
['Sinarcas','Sinarques','Sinarcas'],
['Sollana','Sollana','Sollana'],
['Sot de Chera','Sot de Xera','Sot de Chera'],
['Sueca','Sueca','Sueca'],
['Sumacárcel','Sumacàrcer','Sumacàrcer'],
['Tabernes Blanques','Tavernes Blanques','Tavernes Blanques'],
['Tabernes de Valldigna','Tavernes de la Valldigna','Tavernes de la Valldigna'],
['Teresa de Cofrentes','Teresa de Cofrents','Teresa de Cofrentes'],
['Terrateig','Terrateig','Terrateig'],
['Titaguas','Titagües','Titaguas'],
['Torrebaja','Torre Baixa','Torrebaja'],
['Torrella','Torrella','Torrella'],
['Torrente','Torrent','Torrent'],
['Torres Torres','Torres Torres','Torres Torres'],
['Tous','Tous','Tous'],
['Tuéjar','Toixa','Tuéjar'],
['Turís','Torís','Turís'],
['Utiel','Utiel','Utiel'],
['Valencia','València','València / Valencia'],
['Vallada','Vallada','Vallada'],
['Vallanca','Vallanca','Vallanca'],
['Vallés','Vallès','Vallés'],
['Venta del Moro','Venta del Moro','Venta del Moro'],
['Villamarchante','Vilamarxant','Vilamarxant'],
['Villalonga','Vilallonga','Villalonga'],
['Villanueva de Castellón','Castelló de la Ribera','Villanueva de Castellón'],
['Villar del Arzobispo','El Villar','Villar del Arzobispo'],
['Villargordo del Cabriel','Villargordo del Cabriel','Villargordo del Cabriel'],
['Vinalesa','Vinalesa','Vinalesa'],
['Yátova','Iàtova','Yátova'],
['La Yesa','La Ièsa','La Yesa'],
['Zarra','Zarra','Zarra'],
]

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
}

function buildEntry([spanish, valenciano, oficial]) {
  const officialName = valenciano
  const spanishName = spanish
  const valencianName = valenciano
  const oficialParts = oficial.split(' / ').map((s) => s.trim())
  const candidates = [spanishName, valencianName, ...oficialParts]
  const seen = new Set([officialName])
  const aliases = []
  for (const c of candidates) {
    if (!seen.has(c)) {
      seen.add(c)
      aliases.push(c)
    }
  }
  return {
    officialName,
    spanishName,
    valencianName,
    slug: slugify(officialName),
    province: 'Valencia',
    aliases,
  }
}

const entries = RAW.map(buildEntry)

// Sanity checks
const slugs = entries.map((e) => e.slug)
const dupSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
if (dupSlugs.length) {
  console.error('DUPLICATE SLUGS:', [...new Set(dupSlugs)])
}
console.log('Total municipalities:', entries.length)

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

const entriesSrc = entries
  .map(
    (e) =>
      `  { officialName: '${esc(e.officialName)}', spanishName: '${esc(e.spanishName)}', valencianName: '${esc(e.valencianName)}', slug: '${e.slug}', province: 'Valencia', aliases: [${e.aliases.map((a) => `'${esc(a)}'`).join(', ')}] }`,
  )
  .join(',\n')

const fileContent = `// Generado a partir del listado oficial de municipios de la provincia de Valencia.
// No editar a mano salvo correcciones puntuales — ver scripts/generate-valencia-municipalities.mjs si hace falta regenerar.

export type Municipality = {
  officialName: string
  spanishName: string
  valencianName: string
  slug: string
  province: 'Valencia'
  aliases: string[]
}

export const VALENCIA_MUNICIPALITIES: Municipality[] = [
${entriesSrc},
]

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, ' ')
}

function municipalityKeys(m: Municipality): string[] {
  return [m.officialName, m.spanishName, m.valencianName, ...m.aliases].map(normalizeText)
}

/** Coincidencia exacta (tras normalizar) contra el nombre oficial, castellano, valenciano o algún alias. */
export function normalizeMunicipality(input: string): Municipality | null {
  if (!input?.trim()) return null
  const target = normalizeText(input)
  return VALENCIA_MUNICIPALITIES.find((m) => municipalityKeys(m).includes(target)) ?? null
}

/** Resultados de autocompletado: empieza-por primero, luego contiene-a, máx. \`limit\`. */
export function searchMunicipalities(query: string, limit = 8): Municipality[] {
  const q = normalizeText(query)
  if (!q) return []
  const starts: Municipality[] = []
  const contains: Municipality[] = []
  for (const m of VALENCIA_MUNICIPALITIES) {
    const keys = municipalityKeys(m)
    if (keys.some((k) => k.startsWith(q))) starts.push(m)
    else if (keys.some((k) => k.includes(q))) contains.push(m)
  }
  return [...starts, ...contains].slice(0, limit)
}
`

writeFileSync(new URL('../lib/valencia-municipalities.ts', import.meta.url), fileContent, 'utf8')
console.log('Written lib/valencia-municipalities.ts')

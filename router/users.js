require("dotenv").config();

const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const auth = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

const app = express();
const { body, validationResult } = require("express-validator");
const Furniture = require("../models/Furniture");
const e = require("express");

// ---------------- Seeding Data
router.get("/seedUsers", async (req, res) => {
  await User.deleteMany();

  await User.create(
    [
      {
        username: "Jane",
        password: await bcrypt.hash("123456", 6),
        name: "Jane",
        address: "264 Jurong East Street 35",
      },
      {
        username: "Mary",
        password: await bcrypt.hash("123456", 6),
        name: "Mary",
        address: "789 Tampines Street 42",
      },
    ],
    (err, data) => {
      if (err) {
        console.log("GET /seed error: " + err.message);
        res
          .status(400)
          .json({ status: "error", message: "seeding error occurred" });
      } else {
        res.json({ status: "ok", message: "seeding successful" });
      }
    }
  );
});

router.get("/seedFurniture", async (req, res) => {
  await Furniture.deleteMany();

  await Furniture.create(
    [
      {
        name: "Adams Chaise Sectional Sofa",
        price: 1799,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624964788/crusader/variants/50440746-TR4002/Pebble-Chaise-Sectional-Sofa-Right-Facing-Shadow-grey-Lifestyle-Crop.jpg",
        description:
          "Adams is a timeless piece that boasts of sleek, customisable legs. Its modern, tailored silhouette will sit well in any home.",
        category: "Living",
      },
      {
        name: "Pebble Chaise Sectional Sofa",
        price: 1699,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_700,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1619340871/crusader/variants/T50440970-TL4002-SV/Adams-Right-Chaise-Setcional-Sofa-Pearl-Beige-Silver-Front.jpg",
        description:
          "Pebble adds sophisticated simplicity and contemporary charm with its gently curved frame and metal brass-capped legs.",
        category: "Living",
      },
      {
        name: "Jonathan Leather Sofa",
        price: 2199,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_700,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1626926298/crusader/variants/54000027-LE4016/Jonathan-3-Seater-Sofa-Leather-Brown-Lifestyle-Crop.jpg",
        description:
          "Swathed in a luxurious leather, Jonathan's modern sensibility shines through even more while keeping to its clean silhouette and lounge-worthy modular seating.",
        category: "Living",
      },
      {
        name: "Hanford 2 Seater Sofa",
        price: 999,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1625418561/crusader/variants/50440002-PL4001/Hanford-2-Seater-Sofa-Light-Grey-Front.jpg",
        description:
          "Great for smaller spaces, the Hanford’s classic and thoughtful design makes it a versatile piece for any interior.",
        category: "Living",
      },
      {
        name: "Ethan Right Chaise",
        price: 899,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1653620377/crusader/variants/50440697-TE4004/Ethan-Right-Chaise-Sofa-Stone-Grey-Side-1653620375.jpg",
        description:
          "Tailored and button-tufted, Ethan strikes a fine figure finished with a handsome black and dark wood frame.",
        category: "Living",
      },
      {
        name: "Sorrento Coffee Table",
        price: 229,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624964220/crusader/variants/50110007/Sorrento-Outdoor-Coffee-Table-Lifestyle-Crop.jpg",
        description:
          "Laidback yet refined, Sorrento maximises breezy comfort with sleek proportions for modern outdoor living.",
        category: "Living",
      },
      {
        name: "Andre Coffee Table",
        price: 549,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624969135/crusader/variants/50850025/Andre-Coffee-Table-Front.jpg",
        description:
          "More than meets the eye, Andre marries architectural elegance and rotatable storage functionality in perfect harmony.",
        category: "Living",
      },
      {
        name: "Aziza Area Rug",
        price: 199,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1637912239/crusader/variants/40370049/Aziza-Rug-5_-x-8_-White-Black.jpg",
        description:
          "With comfort at the forefront, Aziza's high-pile tufted construction lends unparalleled cosiness to your living room or reading nook.​",
        category: "Living",
      },
      {
        name: "Yara Jute Area Rug",
        price: 249,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1637915472/crusader/variants/40370028/Yara-Jute-Rug-5_-x-8_-Natural-White.jpg",
        description:
          "Enrich your home with Yara's hearty texture and bold, neutral tones. Strong and durable, this jute rug holds up well in busy spaces.​",
        category: "Living",
      },
      {
        name: "Benoît ll Extend Dining Table Set",
        price: 1359,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/2/_/2_96_18.jpg",
        description:
          "The 5-piece Benoit Extend Dining Table will efficiently update your kitchen or dining area. The set of 4 chairs efficiently slides under and nests neatly into the round table, maximising floor space and keeping things looking neat and tidy.",
        category: "Dining",
      },
      {
        name: "Vincente Medium White Dining",
        price: 180,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x1047/040ec09b1e35df139433887a97daa66f/1/2/1200_vincente_white_3.jpg",
        description:
          "A great looking dining set that elevates the feel of your dining room. Comes with 4 chairs. ",
        category: "Dining",
      },
      {
        name: "Miles Dining Table with Bench and 2 Chairs",
        price: 1359,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1655806811/crusader/variants/PB-DR0008/Miles-Extendable-Dining-Table-Square-Set_7-1655806810.jpg",
        description:
          "Miles is a refreshing mid-century modern collection with thoughtful design details made with exceptional quality.",
        category: "Dining",
      },
      {
        name: "Kelsey Marble Dining Table with 4 Chairs, Walnut",
        price: 2279,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1625420287/crusader/variants/PB-DR0157/Kelsey-Marble-Dining-Table-Walnut-Stain-with-4-Kelsey-Chairs-Lifestyle-Crop.jpg",
        description:
          "This table will become the focal point of any dining room, its rich materials are used to perfection. The Carrara marble table top adds to the luxurious vibe of the piece.",
        category: "Dining",
      },
      {
        name: "Theo Dining Table with 4 Joshua Chairs",
        price: 2089,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1632911320/crusader/variants/PB-DR162/Theo-Round-Dining-Table-With-4-Joshua-Chairs-Meadow-Yellow.jpg",
        description:
          "The Theo Dining Table paired with Joshua Chairs create an ideal spot for intimate dinners, with their curvilinear details and gentle silhouettes.",
        category: "Dining",
      },
      {
        name: "Isora Bar Stool",
        price: 53,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x983/040ec09b1e35df139433887a97daa66f/_/m/_mg_9480.jpg",
        description:
          "Plush PVC leather's sewn into good quality medium density cushion for comfortable seating, while a gleaming chromed metal base with swivel function adds class and style to the Isora.",
        category: "Dining",
      },
      {
        name: "Roudy Bar Stool",
        price: 33,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x1004/040ec09b1e35df139433887a97daa66f/r/o/roundpink1.jpg",
        description: "A nice pink shade bar stool to add to your collection.",
        category: "Dining",
      },
      {
        name: "Miray Bar Table (Walnut)",
        price: 270,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/m/i/miray_bar_table_walnut__mg_2238.jpg",
        description:
          "Enjoy some after-work cocktails or offer some light finger bites at parties with the perfect bar table. The Miray Bar Table is perched atop four splayed tapered legs, perfect for a contemporary setting. Its neutral finish blends effortlessly with a variety of colour and decor schemes. ",
        category: "Dining",
      },
      {
        name: "Nadège Extend Bar Cabinet - Walnut",
        price: 1029,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x811/040ec09b1e35df139433887a97daa66f/0/1/01-00_2.jpg",
        description:
          "The Nadège Extend Bar Cabinet offers a place to keep your wine and barware in glam style while also providing a table for guests to mingle around. ",
        category: "Dining",
      },
      {
        name: "SMEG FAB10 Mini Refrigerator",
        price: 2280,
        image:
          "https://hipvan-images-production.imgix.net/product-images/dc547cd7-ddd8-4923-93cf-214f92233580/SMEG-Appliances--SMEG-FAB10-Mini-Refrigerator-122L--Pastel-Blue-2.png?fm=jpg&auto=format,compress&cs=srgb&ar=1:1&fit=fill&bg=ffffff&ixlib=react-9.2.0&w=790&h=790",
        description:
          "The Smeg FAB10HR series encapsulates the philosophy of Italian hospitality in an eye-catching and retro style.",
        category: "Kitchen",
      },
      {
        name: "Ninja Foodi Multi Cooker",
        price: 449,
        image:
          "https://hipvan-images-production.imgix.net/product-images/38dfaf08-ee4b-4ffe-8df0-e86741f7c802/Ninja--Ninja-Foodi-11-in-1-Multi-Cooker-1.png?fm=jpg&auto=format,compress&cs=srgb&ar=1:1&fit=fill&bg=ffffff&ixlib=react-9.2.0&w=790&h=790",
        description:
          "The PRO pressure cooker that crisps. 11 programmable cooking functions provide endless recipe options inside the non-stick 6 litre cooking pot and 3.7 litre Cook & Crisp Plate. TenderCrisp Technology lets you pressure cook then air fry finish.",
        category: "Kitchen",
      },
      {
        name: "Ninja Foodi Blender",
        price: 299,
        image:
          "https://hipvan-images-production.imgix.net/product-images/f0aecc0f-16c0-46ad-ba06-b2701b532ccd/Ninja--Ninja-Foodi-Blender-Cold---Hot-1.png?fm=jpg&auto=format,compress&cs=srgb&ar=1:1&fit=fill&bg=ffffff&ixlib=react-9.2.0&w=790&h=790",
        description:
          "The Ninja Foodi Cold & Hot Blender has crushing power you expect from a Ninja PLUS. The ability to cook ingredients like proteins and vegetables.",
        category: "Kitchen",
      },
      {
        name: "Philips Essential Air Fryer",
        price: 199,
        image:
          "https://hipvan-images-production.imgix.net/product-images/bdb8d9cd-3837-4e6e-9024-db6b264a6e7b/Philips--Philips-Essential-Air-Fryer-1.png?fm=jpg&auto=format,compress&cs=srgb&ar=1:1&fit=fill&bg=ffffff&ixlib=react-9.2.0&w=790&h=790",
        description:
          "Philips brings the World’s No.1 Airfryer to everyone’s home. Enjoy healthy food that's crispy on the outside and tender on the inside, thanks to Rapid Air Technology.",
        category: "Kitchen",
      },
      {
        name: "SMEG Bean-To-Cup Coffee Machine",
        price: 1188,
        image:
          "https://hipvan-images-production.imgix.net/product-images/eb3813b3-c45b-4ec8-a33b-44309714eff7/SMEG-Appliances--SMEG-Bean-To-Cup-Coffee-Machine--Black-8.png?fm=jpg&auto=format,compress&cs=srgb&ar=1:1&fit=fill&bg=ffffff&ixlib=react-9.2.0&w=790&h=790",
        description:
          "The Smeg automatic bean to cup coffee machine features a sleek new design, with its aesthetics captured by soft essential lines, shiny profiles, and brushed aluminium.",
        category: "Kitchen",
      },
      {
        name: "Jaiden Dinner Plate",
        price: 49,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/f/t/ft10016899_3.jpg",
        description:
          "Tthe Jaiden Tableware Collection features a basic and sleek design with its freeform rims.",
        category: "Kitchen",
      },
      {
        name: "Edith 30-Piece Cutlery Set",
        price: 68,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x900/040ec09b1e35df139433887a97daa66f/_/m/_mg_3217_1.jpg",
        description:
          "Enhance your dining experience with exquisite cutlery. Our Edith 30-Piece Cutlery Set features a high quality dinner spoon, dinner fork, dinner knife, teaspoon and salad fork.",
        category: "Kitchen",
      },
      {
        name: "Avery 24-Piece Cutlery Set",
        price: 66,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x900/040ec09b1e35df139433887a97daa66f/_/m/_mg_3157_1.jpg",
        description:
          "Avery 24-Piece Cutlery Set, which features six high quality dinner spoons/dinner forks/dinner knives/teaspoons.",
        category: "Kitchen",
      },
      {
        name: "Catino Dish Drainer",
        price: 36,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/f/t/ft10008333_1.jpg",
        description:
          "The versatile Catino Dish Drainer is perfect for holding cutlery, bowls and plates while you leave them out to dry.",
        category: "Kitchen",
      },
      {
        name: "GROHE Tempesta Cosmopolitan System",
        price: 599,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x754/040ec09b1e35df139433887a97daa66f/g/r/grohe-26114001-euphoria-260-shower-system_2.png",
        description:
          "The GROHE Tempesta Cosmopolitan 210 single lever shower system adds instant designer style and performance to any bathroom.",
        category: "Bath",
      },
      {
        name: "RIVERNA II Rain Shower Rose",
        price: 68,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x631/040ec09b1e35df139433887a97daa66f/s/r/sr33c-22_1000x.png",
        description:
          "RIVANA 10 Round Rain Shower Head with will transform your regular shower chore into a Rain Shower Experience with minimum hassle and cost.",
        category: "Bath",
      },
      {
        name: "Lavanzi Rainfall Mixer Bath & Shower set ",
        price: 490,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/t/l/tl109_1000x.jpg",
        description:
          "LAVANZI shower column loose is the ideal accessory for setting up a bath arrangement in indoor or outdoor within a trice. ",
        category: "Bath",
      },
      {
        name: "ROMBUSTO Round Handheld Shower Head",
        price: 88,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x631/040ec09b1e35df139433887a97daa66f/r/1/r18b-22_1000x.png",
        description:
          "Rombusto hand shower offers you a new lease of life every time you take a rejuvenating and refreshing shower with water streaming out from its head.",
        category: "Bath",
      },
      {
        name: "Jewel 22' L x 14' W Rectangular Basin",
        price: 288,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x464/040ec09b1e35df139433887a97daa66f/t/b/tbwa526-cbk-m_fc443fac-a04c-4d79-8c1d-f3b10525a89f_1000x.jpg",
        description:
          "This stunning basin is designed to be mounted atop the counter to display its bold beauty. Fired in a special matte glaze, this genuine vitreous china sink features the same strong qualities of a standard porcelain.",
        category: "Bath",
      },
      {
        name: 'Safi 20" L x 15" W Rectangular Basin',
        price: 298,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x517/040ec09b1e35df139433887a97daa66f/t/b/tbpc1020_with_logo_b8a365f6-7da3-42b6-9ad3-eef9046df96d_360x.jpg",
        description:
          "The Safi Stone Rectangular Vessel Bathroom Sink will add a touch of nature to your bathroom project. It is made from one solid piece of marble. It has a polished interior and exterior.",
        category: "Bath",
      },
      {
        name: 'Classic 17" L x 16" W Square Basin',
        price: 388,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/7/8/78272-01-01_1000x.jpg",
        description:
          "With a classic design, this sink is easy to show a simple, modern, and stylish life. Different from the other vessel bathroom sink, its surface will add a sense of mystery and modernity to your decoration.",
        category: "Bath",
      },
      {
        name: "GROHE Bauedge Single-lever Basin Mixer",
        price: 139,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x725/040ec09b1e35df139433887a97daa66f/3/2/32858000.jpg",
        description:
          "Single Hole Installation,Metal lever, GROHE Longlife 28 mm ceramic cartridge, GROHE StarLight chrome finish ",
        category: "Bath",
      },
      {
        name: "GROHE Essentials Cube Guest Bathroom Accessories",
        price: 149,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x523/040ec09b1e35df139433887a97daa66f/4/0/40777001.jpg",
        description:
          "The perfect way to finish a minimalist bathroom is with crisp, clean accessories. The 3-in-1 GROHE Essentials Cube accessory set adds some perfect finishing touches to a chic, comfortable scheme – robe hook, Toilet Paper Holder and 600mm towel rail. ",
        category: "Bath",
      },
      {
        name: "Dalttone Fabric Storage Bed - King Size",
        price: 750,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x662/040ec09b1e35df139433887a97daa66f/r/e/rewdwdwd.jpg",
        description:
          "Stylish and functional, the Dalttone Fabric Storage Bed has a sturdy structure that provides exceptional support for a good night's rest.",
        category: "Bedroom",
      },
      {
        name: "Topnix Faux Leather Drawer Bed Frame - King Size",
        price: 429,
        image:
          "https://www.fortytwo.sg/media/catalog/product/cache/1/image/600x1105/040ec09b1e35df139433887a97daa66f/a/l/alphd1main2_1.jpg",
        description:
          "Ply Wood Mattress Support Base, Flat Surface, Covered with Woven Fabric",
        category: "Bedroom",
      },
      {
        name: "Madison Bed",
        price: 799,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1651229361/crusader/variants/50440770-AM4001/Madison-Bed-Bisque-Square-Set_4.jpg",
        description:
          "Characterised by its biscuit tufted headboard, the Madison Bed brings comfort and a mid-century modern appeal to your bedroom.​",
        category: "Bedroom",
      },
      {
        name: "Joseph Bed, Walnut",
        price: 1099,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1627370658/crusader/variants/52460078/Joseph-Bed-Walnut-Lifestyle-Crop.jpg",
        description:
          "Joseph is characterised by modern walnut tones and low, expansive proportions for a trendy yet steadfast presence.",
        category: "Bedroom",
      },
      {
        name: "Seb Bedside Table",
        price: 359,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624965636/crusader/variants/40550103/Seb-Bedside-Table-Lifestyle-Crop.jpg",
        description:
          "Rustic, homey and thoughtfully crafted, Seb is a mid-century collection made to create warm, cosy spaces.",
        category: "Bedroom",
      },
      {
        name: "Mika Side Table",
        price: 459,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624965556/crusader/variants/52460052/Mika-End-Table-Front.jpg",
        description:
          "Mika’s sleek cylindrical form and swirling wood grain pattern exudes a striking sophistication.",
        category: "Bedroom",
      },
      {
        name: "Seb Dresser",
        price: 849,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624963410/crusader/variants/40550102/Seb-Dresser-Lifestyle-Crop.jpg",
        description:
          "Rustic, homey and thoughtfully crafted, Seb is a mid-century collection made to create warm, cosy spaces.",
        category: "Bedroom",
      },
      {
        name: "Hudson Dresser",
        price: 799,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1624960895/crusader/variants/40550182/Hudson-Dresser-Lifestyle-Crop.jpg",
        description:
          "Classic with rustic undertones, Hudson evokes mid-century modern sophistication via its dark wood and brass accents.",
        category: "Bedroom",
      },
      {
        name: "Percale Sheet Set",
        price: 80,
        image:
          "https://res.cloudinary.com/castlery/image/private/w_500,f_auto,q_auto/b_rgb:F3F3F3,c_fit/v1646316804/crusader/variants/T50440997-WH/Percale-Sheet-Set-Wheat-Set_5.jpg",
        description:
          "Percale is a lightweight, durable fabric that only gets better with time. Its soft, cool texture will coax you to sleep in no time.",
        category: "Bedroom",
      },
    ],
    (err, data) => {
      if (err) {
        console.log("GET /seed error: " + err.message);
        res
          .status(400)
          .json({ status: "error", message: "seeding error occurred" });
      } else {
        res.json({ status: "ok", message: "seeding successful" });
      }
    }
  );
});

// ------------------ Registration route
router.put("/registration", async (req, res) => {
  console.log("accessing user reg endpoint");
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "duplicate username" });
    }
    const hash = await bcrypt.hash(req.body.password, 6);
    const createdUser = await User.create({
      username: req.body.username,
      password: hash,
      name: req.body.name,
      address: req.body.address,
    });
    console.log("created user", createdUser);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    console.log("PUT /create", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
});

// ---------------- Login route
router.post("/login", async (req, res) => {
  try {
    // ---------- Login ID check, checking if user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("No such user");
      return res
        .status(400)
        .json({ status: "error", message: "username or password error" });
    }

    // ---------- Password check
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      console.log("Password error!");
      return res
        .status(401)
        .json({ status: "error", message: "username or password error" });
    }

    // ----------- Sending in payload for JWT sign
    const payload = {
      id: user._id,
      username: user.username,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      // To change back to 20m
      expiresIn: "30d",
      jwtid: uuid4(),
    });
    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuid4(),
    });

    const response = { access, refresh };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "error encountered" });
  }
});

// --------------- View user info
router.get("/viewUser", auth, async (req, res) => {
  // Check if there are any furniture first
  try {
    const userExists = await User.find({
      username: req.decoded.username,
      username: { $exists: true },
      // MongoDB dot notation. This checks for whether the zero-th (first) element in array  exists
      // https://www.mongodb.com/docs/manual/core/document/#dot-notation
    });

    if (userExists.length === 0) {
      return res
        .status(400)
        .json({ status: "error!", message: "no user found!" });
    }

    const user = await User.find(
      { username: req.decoded.username },
      { username: 1, name: 1, address: 1 }
    );
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
});

// --------------- Edit user info
router.patch("/editUser", auth, async (req, res) => {
  // Check if there are any furniture first

  try {
    const editUser = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
      },
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
        },
      }
    );
    return res.json(editUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
});

// --------------- View all furniture
router.get("/", async (req, res) => {
  try {
    const viewAllFurnitureData = await Furniture.find({});
    return res.json(viewAllFurnitureData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- View all living furniture
router.get("/viewLivingFurniture", async (req, res) => {
  try {
    const viewAllFurnitureData = await Furniture.find({ category: "Living" });
    return res.json(viewAllFurnitureData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- View all bed furniture
router.get("/viewBedroomFurniture", async (req, res) => {
  try {
    const viewAllFurnitureData = await Furniture.find({ category: "Bedroom" });
    return res.json(viewAllFurnitureData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- View all kitchen furniture
router.get("/viewKitchenFurniture", async (req, res) => {
  try {
    const viewAllFurnitureData = await Furniture.find({ category: "Kitchen" });
    return res.json(viewAllFurnitureData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- View all dining furniture
router.get("/viewDiningFurniture", async (req, res) => {
  try {
    const viewAllFurnitureData = await Furniture.find({ category: "Dining" });
    return res.json(viewAllFurnitureData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- View all Bath furniture
router.get("/viewBathFurniture", async (req, res) => {
  try {
    const viewAllFurnitureData = await Furniture.find({ category: "Bath" });
    return res.json(viewAllFurnitureData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});
// --------------- View user furniture
router.get("/viewUserFurniture", auth, async (req, res) => {
  // Check if there are any furniture first
  try {
    const furnitureExists = await User.find({
      username: req.decoded.username,
      "furniture.0": { $exists: true },
      // MongoDB dot notation. This checks for whether the zero-th (first) element in array  exists
      // https://www.mongodb.com/docs/manual/core/document/#dot-notation
    });

    if (furnitureExists.length === 0) {
      return res
        .status(400)
        .json({ status: "error!", message: "no furniture found!" });
    }

    const furniture = await User.find(
      { username: req.decoded.username },
      { furniture: 1 }
    );
    return res.json(furniture);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
});

// --------------- Add furniture to existing account route
router.patch("/addFurniture", auth, async (req, res) => {
  const furniture = await User.findOneAndUpdate(
    { username: req.decoded.username },
    {
      $push: {
        furniture: {
          name: req.body.name,
          image: req.body.image,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
        },
      },
    },
    { new: true }
  );
  return res.json(furniture);
});

// ----------------- Delete Furniture
router.delete("/deleteFurniture", auth, async (req, res) => {
  try {
    const deleteItem = await User.findOne({
      username: req.decoded.username,
      furniture: { $elemMatch: { _id: req.body.furnitureId } },
    });

    if (!deleteItem) {
      return res.status(400).json({
        status: "Error!",
        message: "Please ensure there are existing Furniture to delete",
      });
    }

    const deleteFurniture = await User.findOneAndUpdate(
      {
        username: req.decoded.username,
        furniture: { $elemMatch: { _id: req.body.furnitureId } },
      },
      {
        $pull: {
          furniture: { _id: req.body.furnitureId },
        },
      }
    );
    res.json(deleteFurniture);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

// --------------- Add order to existing account route
router.patch("/addOrder", auth, async (req, res) => {
  console.log(req.body);

  try {
    const furniture = await User.findOneAndUpdate(
      { username: req.decoded.username },
      {
        $push: {
          order: {
            date: req.body.date,
            price: req.body.price,
            furniture: req.body.furniture,
          },
        },
        $set: { furniture: [] },
      },
      { new: true }
    );
    console.log(furniture);

    return res
      .status(200)
      .json({ status: 200, message: "furniture added", payload: furniture });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "an error has occurred" });
  }
});

// --------------- View user orders
router.get("/viewUserOrder", auth, async (req, res) => {
  // Check if there are any furniture first
  try {
    const orderExists = await User.find({
      username: req.decoded.username,
      "order.0": { $exists: true },
      // MongoDB dot notation. This checks for whether the zero-th (first) element in array  exists
      // https://www.mongodb.com/docs/manual/core/document/#dot-notation
    });

    if (orderExists.length === 0) {
      return res
        .status(400)
        .json({ status: "error!", message: "no order found!" });
    }

    const order = await User.find(
      { username: req.decoded.username },
      { order: 1 }
    );
    return res.json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
});

// ----------------- View all orders route
// -------- Returns only the order belonging to the user queried for
router.post("/viewOrder", auth, async (req, res) => {
  try {
    const viewOrder = await User.findOne(
      {
        username: req.decoded.username,
      },
      {
        order: 1,
      }
    );
    return res.json(viewOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: "error encountered" });
  }
});

module.exports = router;

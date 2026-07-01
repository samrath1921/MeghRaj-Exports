const ITEMS = [
  { src: '/images/bags/backpacks/laptop/1.png',       label: 'Laptop Bag'   },
  { src: '/images/bags/backpacks/business/1.png',     label: 'Business'     },
  { src: '/images/bags/duffel-gym/gym/2.png',          label: 'Gym Bag'      },
  { src: '/images/bags/sports/cricket/3.png',          label: 'Cricket Kit'  },
  { src: '/images/bags/backpacks/school/2.png',        label: 'School'       },
  { src: '/images/bags/duffel-gym/travel/1.png',       label: 'Travel'       },
  { src: '/images/bags/duffel-gym/convertible/3.png',  label: 'Convertible'  },
  { src: '/images/bags/backpacks/everyday/1.png',      label: 'Everyday'     },
  { src: '/images/bags/sports/hockey/1.png',           label: 'Hockey'       },
  { src: '/images/bags/backpacks/laptop/3.png',        label: 'Laptop Pro'   },
  { src: '/images/bags/duffel-gym/gym/4.png',          label: 'Pro Gym'      },
  { src: '/images/bags/sports/cricket/5.png',          label: 'Kit Bag'      },
];

const doubled = [...ITEMS, ...ITEMS];

export default function ProductStrip() {
  return (
    <section className="strip-section" aria-label="Product catalogue preview">
      <div className="strip-eyebrow">[ PRODUCT CATALOGUE — HOVER TO PAUSE ]</div>
      <div className="strip-mask">
        <div className="strip-track">
          {doubled.map((item, i) => (
            <div key={i} className="strip-item">
              <div className="strip-img-box">
                <img src={item.src} alt={item.label} className="strip-img" loading="lazy" />
              </div>
              <span className="strip-item-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

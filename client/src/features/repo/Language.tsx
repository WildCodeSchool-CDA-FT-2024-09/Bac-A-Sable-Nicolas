const langLogo = [
  {
    "id": 1,
    "url": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  },
  {
    "id": 2,
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/2048px-HTML5_Badge.svg.png"
  },
  {
    "id": 3,
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png"
  },
  {
    "id": 4,
    "url": "https://sass-lang.com/assets/img/styleguide/seal-color.png"
  },
  {
    "id": 5,
    "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png"
  },
  {
    "id": 6,
    "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
  },
  {
    "id": 7,
    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png"
  }
]

function Language({ lang }) {
  const imageLogo = langLogo.find((e) => e.id == lang.id)?.url;

  return (
    <li className="p-1 flex">
      {imageLogo && (
        <img 
          className="w-10"
          src={imageLogo} 
          alt={lang.name}
        />
      )}
    </li>
  )
}

export default Language;

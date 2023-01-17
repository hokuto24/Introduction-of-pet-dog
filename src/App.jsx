import { useEffect, useState } from "react";
import { fetchImages } from "./api";


function Tall_Story(){

  function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
  }
  const storyText = 'この犬の名前は:inserta:です。性格は:insertb:で:insertc:で遊ぶのが好きです。私たちの出会いは:insertd:です。初めて出会った時衝撃を受けました。:inserte:その後、用意を整え、家に迎え入れました。:inserta:とは:insertf:';
  const insertA = ['マロン', 'ラッキー', 'チーズ', 'ソラ', 'レオ', 'ハナ', 'モモ'];
  const insertB = ['わがまま', '甘えんぼ', 'のんびりや', '活発', '内気', '大人しい'];
  const insertC = ['ボール', 'フラスビー', '骨'];
  const insertD = ['ペットショップ', '帰宅途中の道', '里親制度', 'マッチングサイト'];
  const insertE = ['目が合った瞬間に一緒に暮らしたいと言う気持ちが湧き上がってきました。', '見た瞬間に抱き上げてみたくなりました。', '一目見たその瞬間に名前が浮かび上がってきました。', '私と誕生日が一致していたのです。'];
  const insertF = ['現在も仲良く暮らしています。これからも楽しく過ごしていきたいです。', 'お別れすることになってしまったのですが、今でも大事な家族の一員です。']
  let newStory = storyText;

  const aItem = randomValueFromArray(insertA);
  const bItem = randomValueFromArray(insertB);
  const cItem = randomValueFromArray(insertC);
  const dItem = randomValueFromArray(insertD);
  const eItem = randomValueFromArray(insertE);
  const fItem = randomValueFromArray(insertF);

  newStory = newStory.replaceAll(':inserta:',aItem);
  newStory = newStory.replaceAll(':insertb:',bItem);
  newStory = newStory.replaceAll(':insertc:',cItem);
  newStory = newStory.replaceAll(':insertd:',dItem);
  newStory = newStory.replaceAll(':inserte:',eItem);
  newStory = newStory.replaceAll(':insertf:',fItem);

  return (
    <div className="columns has-text-centered has-background-warning-light">
      {newStory}
    </div>
  );
}

function Header() {
  return (
    <header className="hero is-warning is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">私の愛犬紹介</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <figure className="image">
      <img src={props.src} alt="cute dog!" />
    </figure>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("samoyed").then((urls) => {
      setUrls(urls);
    });
  }, []);
  return (
    <main>
      <section className="section">
        <div className="is-vcentered">
          <Gallery urls={urls} />
          <Tall_Story />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
        <p>
          5421002 大久保歩香
          日本大学文理学部情報科学科 Webプログラミングの演習課題
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

import RamenDiningIcon from '@mui/icons-material/RamenDining'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex w-3/4 flex-col'>
      <section className='mb-24'>
        <h2 className='mb-12 text-6xl font-black'>JIROES</h2>
        <p className='mb-6 text-xl'>
          JIROESとは、二郎系ラーメンに特化した口コミアプリです。
          <br />
          このアプリは
          <span className='font-bold'>
            「二郎系ラーメンの美味しさをもっと多くの人に知って欲しい」
          </span>
          との想いから生まれました。
          <br />
          <span className='font-bold'>
            「二郎系に挑戦してみたいけどルールがよく分からない」
          </span>
          と訪問をためらっている方の為に、
          <br />
          <RamenDiningIcon className='mr-2' />
          <span className='font-bold text-orange-500'>ラーメン二郎の心得</span>
          <br />
          <RamenDiningIcon className='mr-2' />
          <span className='font-bold text-orange-500'>
            店舗毎の、独自のルール・食券購入タイミング・コールの仕方等の情報
          </span>
          <br />
          を提供し、あなたの
          <span className='font-bold'>「どうしたらいいかわからない」</span>
          を解決し二郎系デビューを後押しします！
          <br />
          勿論、ジロリアンの方々も情報収集に役立ててくださいね！
        </p>
        <Link className='text-3xl font-bold text-orange-500' href={'/shops'}>
          <SearchIcon className='mr-2 text-slate-900' />
          店舗一覧はこちらをクリック！
        </Link>
      </section>
      <section className='mb-24'>
        <h2 className='mb-12 text-6xl font-black'>How to use</h2>
        <p className='mb-4 text-xl'>
          <RamenDiningIcon className='mr-2' />
          上の検索窓に店舗名やエリアを入力し気になる店舗をチェックしてみましょう！
        </p>
        <p className='mb-4 text-xl'>
          <RamenDiningIcon className='mr-2' />
          ログインをすればレビュー投稿・いいね・新規店舗登録等が可能に！
        </p>
        <p className='text-xl'>
          <RamenDiningIcon className='mr-2' />
          <span className='font-bold text-orange-500'>ラーメン二郎の心得</span>
          は下をチェック！
          <br />
        </p>
      </section>
      <section>
        <h2 className='mb-12 text-6xl font-black'>ラーメン二郎の心得</h2>
        <section className='mb-8'>
          <h3 className='mb-2 text-2xl font-bold'>一、 事前に情報収集して行くべし！</h3>
          <p className='text-xl'>
            二郎系ラーメンは店舗独自のルールを持つ店舗が多いです。
            <br />
            その為店舗情報やレビューを参考に、ある程度予習をしていく事で訪問時に困る事は少なくなるでしょう。
            <br />
          </p>
        </section>
        <section className='mb-8'>
          <h3 className='mb-2 text-2xl font-bold'>一、 必ず食べ切れる量を頼むべし！</h3>
          <p className='text-xl'>
            もやしモリモリの山のようなビジュアルで知られている通り、二郎系は量がとても多いラーメンです。
            <br />
            麺だけでも、茹で前300~350g前後と一般的なラーメン店の並盛り約2倍以上の量をデフォルトとしています。
            <br />
            「そんなに食べられない」という方は、「麺少なめ」や「麺半分」でのオーダーも大多数の店舗で可能です。
            <br />
            美味しく食べ切れる量を頼み、お店も自分もハッピーで退店しましょう！
            <br />
          </p>
        </section>
        <section className='mb-8'>
          <h3 className='mb-2 text-2xl font-bold'>一、 コールを覚えるべし！</h3>
          <p className='text-xl'>
            二郎系の店舗には「コール」と呼ばれる呪文が存在します。
            <br />
            基本的なコールは以下の4種類です。言ったものが追加されます。
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>ヤサイ</span>
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>ニンニク</span>
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>
              アブラ（ヤサイの上にかけられる背脂）
            </span>
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>カラメ（味濃いめ）</span>
            <br />
            そして、大半の店舗では下記がデフォルトの状態です。
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>ヤサイ：既に並量入っている</span>
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>ニンニク：入っていない</span>
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>アブラ：入っていない</span>
            <br />
            <RamenDiningIcon className='mr-2' />
            <span className='font-bold text-orange-500'>カラメ：通常の濃さ</span>
            <br />
            ここに、<span className='font-bold'>「追加するもののみ」</span>
            伝えるのが「コール」です。デフォルトで良ければ「そのままで」と伝えましょう。
            <br />
            また、マシやマシマシが可能な店舗ではマシたいものの直後につける事で更に増量も出来ます。
            <br />
            例１：「ヤサイニンニクアブラ」=「ヤサイ」（増量）+「ニンニク」（入れる）+「アブラ」（入れる）
            <br />
            例２：「ヤサイマシニンニク」=「ヤサイマシ」+「ニンニク」
            <br />
            例３：「ヤサイニンニクマシカラメ」=「ヤサイ」+「ニンニクマシ」+「カラメ」
            <br />
            例４：「ヤサイマシニンニクマシマシアブラ」=「ヤサイマシ」+「ニンニクマシマシ」+「アブラ」
            <br />
            さぁ、コールの基本が分かったところで実際の流れを以下の例で見てみましょう！
            <br />
          </p>
        </section>
        <section className='mb-8'>
          <h3 className='mb-2 text-2xl font-bold'>一、 コールの流れを把握するべし！</h3>
          <section className='text-xl'>
            <p>〜食券購入・入店・着席〜</p>
            <p>あなた：（カウンターの上に購入した食券ｽｯ）</p>
            <p>〜数分後〜</p>
            <p>
              店主：（席番号や食券（小ラーメンなど）を呼ばれて、または顔を見ながら）「〜の方、
              <span className='font-bold text-orange-500'>ニンニク入れますか？</span>」
            </p>
            <p>
              <span className='font-bold'>
                〜コールチャンス！〜（「ニンニク入れますか？」がコール発動のサインだ！）
              </span>
            </p>
            <p>あなた：「ヤサイニンニクアブラで！」</p>
            <p>店主：「ハイどうぞ〜！」（ﾗｰﾒﾝﾄﾞｰﾝ！）</p>
            <p>
              〜こうしてあなたは「ヤサイ増量・ニンニク入り・背脂入り」のラーメンを手にすることが出来ました！ﾔｯﾀﾈ！〜
            </p>
            <p>
              スムーズにコールするために、麺あげが始まり「そろそろかな」というタイミングで
              <br />
              イヤホンやスマホの使用はストップすることを推奨します。
            </p>
            <p>
              また後ろに並び客がいる場合には、店がスムーズに回転できるように、
              <br />
              ながらスマホ等もしないのが基本的なルールです。
            </p>
          </section>
        </section>
        <section>
          <h3 className='mb-2 text-2xl font-bold'>一、 気持ち良く退店するべし！</h3>
          <p className='text-xl'>
            そして、二郎には食べ終わった後に最後の作法があります。
            <br />
            それが<span className='font-bold'>「丼をカウンターに上げる事」</span>と
            <span className='font-bold'>「ふきんで自分のカウンターを拭く事」</span>です。
            <br />
            二郎系の店舗では回転率を高くする事で比較的低価格で量の多いラーメンを提供できているので、
            <br />
            この作業を客側が行うだけでも店側としては大変な労力削減になります。
            <br />
            ティッシュが置いてある店舗ではゴミ箱が設置されていることが多いので、
            <br />
            こちらも「自分の紙ゴミは自分でゴミ箱へ」という精神で協力をお願いします。
            <br />
            こうして、自分も店側もハッピーになるように気持ち良く退店しましょう！
            <br />
            ここまで出来ればあなたも立派なジロリアンです！
            <span className='font-bold text-orange-500'>素敵なジローライフを！</span>
            <br />
          </p>
        </section>
      </section>
    </div>
  )
}

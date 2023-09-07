function Guide() {
  return (
    <>
      <div className="guide-container">
        <div className="guide-detail-container">
          <div className="explain-container">
            <h2>脚本を登録する</h2>
            <div>脚本には、クレジット,上演料などを設定できます</div>
            <div>
              マイページからは脚本へのコメントや評価を見ることができます
            </div>
            <div>※ 脚本の著作権はすべて投稿した作者に帰属します。</div>
          </div>

          <div className="guide-image-container">
            <img src="/post.png" alt="" />
          </div>
        </div>
      </div>
      <div className="guide-container">
        <div className="guide-detail-container">
          <div className="explain-container">
            <h2>脚本を探す</h2>
            <div>上演時間,人数,カテゴリなどから脚本を探すことができます</div>
            <div>気に入った作品にはお気に入りをおして記録できます</div>
            <div>上演を希望する場合は、脚本の作者に連絡をお願いします</div>
            <div>※ 脚本の著作権はすべて投稿した作者に帰属します。</div>
          </div>

          <div className="guide-image-container">
            <img src="/find.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Guide;

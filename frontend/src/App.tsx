import { useState } from 'react';
// import './App.css'; // App.css is now empty

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const totalSteps = 3;

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card p-8 rounded-lg shadow-md">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-primary mb-2">
            360°フィードバックツール
          </h1>
          <p className="text-center text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
        </header>

        <main className="mb-6">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Step 1: 対象者リスト取込
              </h2>
              <p className="text-center text-muted-foreground">
                CSVファイルをアップロードしてください。
              </p>
              {/* CSVアップロードエリア */}
              <label htmlFor="csv-upload" className="mt-4 flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent hover:border-primary transition-colors duration-200 ease-in-out">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {selectedFile ? (
                    <p className="text-lg font-semibold text-primary">{selectedFile.name}</p>
                  ) : (
                    <>
                      <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">クリックしてアップロード</span> またはドラッグ＆ドロップ</p>
                  <p className="text-xs text-muted-foreground">CSVファイル (UTF-8)</p>
                    </>
                  )}
                </div>
                <input id="csv-upload" type="file" className="hidden" accept=".csv" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
              </label>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Step 2: 設問グループ設定
              </h2>
              <div className="space-y-6">
                {[{
                  title: "リーダーシップについて",
                  description: "目標設定、チーム牽引、意思決定に関する設問を設定します。",
                  itemCount: 5
                }, {
                  title: "コミュニケーションについて",
                  description: "傾聴力、伝達力、協調性に関する設問を設定します。",
                  itemCount: 4
                }, {
                  title: "業務遂行能力について",
                  description: "計画性、実行力、問題解決能力に関する設問を設定します。",
                  itemCount: 6
                }].map((group, index) => (
                  <div key={index} className="p-6 bg-card border border-border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-primary mb-2">{group.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{group.itemCount}個の設問</span>
                      <button className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-accent transition-colors">
                        編集
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
                    新しいグループを追加
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Step 3: Googleフォーム生成・展開
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-3">設定内容の確認</h3>
                  <div className="p-6 bg-card border border-border rounded-lg space-y-4">
                    <div>
                      <h4 className="text-md font-medium text-muted-foreground">対象者リスト:</h4>
                      <p className="text-sm text-foreground">{selectedFile ? selectedFile.name : "未選択"}</p>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-muted-foreground">設問グループ:</h4>
                      <ul className="list-disc list-inside pl-4 text-sm text-foreground">
                        <li>リーダーシップについて (5問)</li>
                        <li>コミュニケーションについて (4問)</li>
                        <li>業務遂行能力について (6問)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <button className="w-full max-w-xs px-6 py-3 bg-primary text-primary-foreground rounded-md text-lg font-semibold hover:opacity-90 transition-opacity">
                    Googleフォームを生成
                  </button>
                  <p className="text-sm text-muted-foreground">
                    （注意：Googleアカウントとの連携が必要です）
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary mt-8 mb-3">生成済みフォーム一覧</h3>
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      まだ生成されたフォームはありません。
                    </p>
                    {/* ここに生成済みフォームのリストが表示される予定 */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md disabled:opacity-50"
          >
            戻る
          </button>
          <button
            onClick={goToNextStep}
            disabled={currentStep === totalSteps}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
          >
            次へ
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;

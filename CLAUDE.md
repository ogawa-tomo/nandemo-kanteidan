# 開運！なんでも鑑定団 鑑定額発表アプリ

## プロジェクト概要

テレビ番組「開運！なんでも鑑定団」の鑑定額発表シーンを再現したWebアプリケーション。
ユーザーがボタンを押すと、ランダムな鑑定額がスロットマシン式のアニメーションで発表される。

## 主要機能

### 必須機能
1. **鑑定額発表ボタン**
   - ユーザーがクリック/タップすると鑑定額発表が開始
   - 初期状態では「鑑定開始」などの表示

2. **スロットマシン式アニメーション**
   - 各桁の数字が個別に回転して停止
   - 右側の桁から順番に確定していく演出
   - アニメーション時間：約2〜3秒

3. **ランダム鑑定額生成**
   - 範囲：10,000円 〜 100,000,000円（1万円〜1億円）
   - 1万円単位で生成（端数なし）
   - カンマ区切りで読みやすく表示（例：5,000,000）

4. **リセット機能**
   - 鑑定額発表後、「もう一度鑑定」ボタンを表示
   - クリックで初期状態に戻り、再度鑑定可能
   - 何度でも繰り返し使用可能

5. **レスポンシブデザイン**
   - PC、タブレット、スマートフォンで適切に表示
   - 画像とテキストサイズを画面幅に応じて調整

## 技術仕様

### 技術スタック
- **フレームワーク**: React (Create React App または Vite推奨)
- **言語**: TypeScript (型安全性のため推奨)
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks (useState, useEffect)

### 開発環境
- Node.js: v18以上
- npm または yarn
- モダンブラウザ対応（Chrome, Firefox, Safari, Edge最新版）

### Tailwind CSS セットアップ
```bash
# Tailwind CSSのインストール
npm install -D tailwindcss postcss autoprefixer

# 設定ファイル生成
npx tailwindcss init -p
```

**tailwind.config.js 設定例:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'appraisal-red': '#FF0000',
        'appraisal-brown': '#8B6F47',
      },
      fontFamily: {
        'noto-sans': ['"Noto Sans JP"', 'sans-serif'],
      },
      keyframes: {
        'slot-spin': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slot-spin': 'slot-spin 0.1s linear infinite',
        'fade-in': 'fade-in 0.5s ease-in',
      },
    },
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
```

## UI/UXデザイン

### レイアウト構成
1. **上部：鑑定額表示パネル**
   - 赤い背景に黒い数字（¥5,000,000形式）
   - フォントは太字で視認性重視
   - アニメーション中は数字が回転

2. **中央：鑑定士イラスト**
   - 提供された画像を背景として使用
   - 画像内の鑑定士5名のイラスト部分

3. **下部：テキスト表示エリア**
   - 茶色の背景
   - 「◯◯◯円です！」の形式で表示
   - 発表後にフェードイン

4. **ボタン配置**
   - 初期状態：中央に「鑑定開始」ボタン
   - 発表後：「もう一度鑑定」ボタン

### カラースキーム
- 鑑定額パネル背景：`#FF0000`（赤）→ Tailwind: `bg-appraisal-red`
- 鑑定額テキスト：`#000000`（黒）→ Tailwind: `text-black`
- テキストエリア背景：`#8B6F47`（茶色）→ Tailwind: `bg-appraisal-brown`
- テキスト：`#FFFFFF`（白）→ Tailwind: `text-white`
- ボタン：番組イメージに合わせた配色

### フォント（Tailwind CSSクラス）
- 鑑定額表示：`font-noto-sans font-black text-6xl md:text-8xl`
- テキスト：`font-noto-sans font-bold text-2xl md:text-4xl`
- 日本語フォント：Noto Sans JP（Google Fonts経由）

## アニメーション仕様

### スロットマシン式アニメーション詳細

1. **開始時の動作**
   - 「鑑定開始」ボタンクリック → アニメーション開始
   - すべての桁が一斉に高速回転開始（0〜9を高速で循環）

2. **停止シーケンス**
   - **右端（一の位）から順番に停止**
   - 各桁の停止間隔：約0.2〜0.3秒
   - 停止時にわずかなバウンス効果（オプション）
   - 例：5,000,000の場合
     - まず右端の0が停止
     - 次の0が停止
     - ...順番に左へ

3. **完了時の動作**
   - すべての桁が停止
   - 0.5秒後に下部テキスト「5,000,000円です！」がフェードイン
   - 「もう一度鑑定」ボタンを表示

4. **アニメーション実装方法**
   - Tailwind CSSのカスタムアニメーション（`animate-slot-spin`, `animate-fade-in`）
   - CSS Transitions または CSS Animations
   - React Spring や Framer Motion などのライブラリも使用可能

## Tailwind CSSを使った実装例

### AppraisalPanel コンポーネント例
```tsx
const AppraisalPanel: React.FC<{ value: number | null; isAnimating: boolean }> = ({
  value,
  isAnimating
}) => {
  return (
    <div className="bg-appraisal-red w-full max-w-4xl p-8 rounded-lg shadow-2xl">
      <div className="flex items-center justify-center gap-2">
        <span className="text-black font-noto-sans font-black text-6xl md:text-8xl">
          ¥
        </span>
        <div className="flex gap-1">
          {/* 各桁のスロットアニメーション */}
          {value !== null && (
            <span className="text-black font-noto-sans font-black text-6xl md:text-8xl tracking-wider">
              {value.toLocaleString('ja-JP')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
```

### AppraisalButton コンポーネント例
```tsx
const AppraisalButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  label: string
}> = ({ onClick, disabled, label }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        bg-yellow-500 hover:bg-yellow-600
        text-gray-900 font-bold
        py-4 px-8 rounded-full
        transition-all duration-200
        transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
      "
    >
      {label}
    </button>
  );
};
```

### ResultText コンポーネント例
```tsx
const ResultText: React.FC<{ value: number; show: boolean }> = ({ value, show }) => {
  return (
    <div
      className={`
        bg-appraisal-brown text-white
        font-noto-sans font-bold
        text-2xl md:text-4xl
        py-6 px-8 rounded-lg
        transition-opacity duration-500
        ${show ? 'opacity-100 animate-fade-in' : 'opacity-0'}
      `}
    >
      {value.toLocaleString('ja-JP')}円です！
    </div>
  );
};
```

### レスポンシブ対応の例
```tsx
// 画面サイズに応じた表示
<div className="
  w-full
  max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl
  px-4 sm:px-6 md:px-8
">
  {/* コンテンツ */}
</div>

// 画像のレスポンシブ配置
<img
  src="/images/appraisal-panel.png"
  alt="鑑定団パネル"
  className="
    w-full h-auto
    object-contain
    max-h-48 sm:max-h-64 md:max-h-96
  "
/>
```

## データ仕様

### ランダム鑑定額生成ロジック

```typescript
// 疑似コード
const generateAppraisalValue = (): number => {
  const min = 10000;        // 1万円
  const max = 100000000;    // 1億円
  const step = 10000;       // 1万円単位

  const range = (max - min) / step;
  const random = Math.floor(Math.random() * (range + 1));

  return min + (random * step);
}

// フォーマット例
const formatCurrency = (value: number): string => {
  return value.toLocaleString('ja-JP');
}
```

### 出力例
- 10,000円
- 250,000円
- 1,000,000円
- 5,000,000円
- 50,000,000円
- 100,000,000円

## ディレクトリ構成（推奨）

```
nandemo-kanteidan/
├── public/
│   └── images/
│       └── appraisal-panel.png  # 提供された画像
├── src/
│   ├── components/
│   │   ├── AppraisalPanel.tsx      # 鑑定額表示パネル
│   │   ├── SlotAnimation.tsx       # スロットアニメーション
│   │   ├── AppraisalButton.tsx     # 鑑定開始/リセットボタン
│   │   └── ResultText.tsx          # 結果テキスト表示
│   ├── hooks/
│   │   └── useAppraisal.ts         # 鑑定ロジックのカスタムフック
│   ├── utils/
│   │   └── appraisalGenerator.ts   # ランダム鑑定額生成
│   ├── App.tsx                      # メインコンポーネント
│   ├── index.tsx                    # エントリーポイント
│   └── index.css                    # Tailwind CSSのインポート
├── tailwind.config.js               # Tailwind CSS設定
├── postcss.config.js                # PostCSS設定
├── CLAUDE.md                        # このファイル
├── package.json
└── README.md
```

## コンポーネント設計

### 1. App.tsx（親コンポーネント）
- 全体のレイアウト管理
- 状態管理（鑑定中、完了、リセット）
- **主要なTailwindクラス例**: `min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4`

### 2. AppraisalPanel.tsx
- 赤い背景パネルと鑑定額表示
- スロットアニメーションのトリガー
- **主要なTailwindクラス例**: `bg-appraisal-red w-full max-w-4xl p-8 rounded-lg shadow-2xl`
- **数字表示**: `text-black font-noto-sans font-black text-6xl md:text-8xl tracking-wider`

### 3. SlotAnimation.tsx
- 各桁のスロットマシンアニメーション
- 数字の回転と停止制御
- **主要なTailwindクラス例**:
  - コンテナ: `overflow-hidden h-20 md:h-32 inline-block`
  - アニメーション中: `animate-slot-spin`
  - 停止時: `transition-transform duration-300`

### 4. AppraisalButton.tsx
- 鑑定開始/もう一度鑑定ボタン
- 状態に応じたラベル変更
- **主要なTailwindクラス例**:
  - `bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-full`
  - `transition-all duration-200 transform hover:scale-105`
  - `disabled:opacity-50 disabled:cursor-not-allowed`

### 5. ResultText.tsx
- 「◯◯◯円です！」のテキスト表示
- フェードインアニメーション
- **主要なTailwindクラス例**:
  - `bg-appraisal-brown text-white font-noto-sans font-bold`
  - `text-2xl md:text-4xl py-6 px-8 rounded-lg`
  - `animate-fade-in`

## 状態管理

### アプリケーションの状態
```typescript
type AppState = 'idle' | 'animating' | 'completed';

interface AppraisalState {
  state: AppState;
  currentValue: number | null;
  isAnimating: boolean;
}
```

### 状態遷移
1. **idle（初期状態）**
   - 「鑑定開始」ボタン表示
   - 鑑定額は未表示または「¥??????」

2. **animating（アニメーション中）**
   - スロットマシン回転中
   - ボタン無効化

3. **completed（完了）**
   - 鑑定額確定
   - 結果テキスト表示
   - 「もう一度鑑定」ボタン表示

## 実装優先度

### Phase 1: 基本機能（MVP）
- [x] プロジェクトセットアップ（React + TypeScript + Vite）
- [x] Tailwind CSSのインストールと設定
- [x] カスタムカラー・アニメーションの設定（tailwind.config.js）
- [x] 基本レイアウト作成
- [x] 画像の配置と表示
- [x] ランダム鑑定額生成機能
- [x] 鑑定開始ボタンとリセット機能

### Phase 2: アニメーション
- [x] スロットマシン式アニメーション実装
- [x] 各桁の順次停止ロジック
- [x] 結果テキストのフェードイン

### Phase 3: UI/UX改善
- [ ] レスポンシブデザイン対応
- [ ] アニメーションの微調整（速度、タイミング）
- [ ] ボタンのホバー効果
- [ ] アクセシビリティ対応

### Phase 4: オプション機能（将来的な拡張）
- [ ] 効果音追加（ドラムロール、発表音など）
- [ ] BGM追加
- [ ] 鑑定履歴表示
- [ ] SNSシェア機能
- [ ] 鑑定額範囲のカスタマイズ機能

## 開発時の注意事項

### パフォーマンス
- アニメーションは60fps維持
- 画像の最適化（WebP形式推奨）
- 不要な再レンダリングを避ける

### アクセシビリティ
- キーボード操作対応（EnterキーでもOK）
- ARIAラベルの適切な設定
- フォーカス管理

### ブラウザ互換性
- Tailwind CSSのデフォルト設定で主要ブラウザをサポート
- CSS Grid/Flexbox（Tailwindのutilityクラス使用）
- モダンJavaScript機能の使用（必要に応じてポリフィル）
- autoprefixerによる自動ベンダープレフィックス付与

## テスト計画

### 単体テスト
- ランダム鑑定額生成の範囲チェック
- フォーマット関数のテスト

### 統合テスト
- ボタンクリック → アニメーション → 結果表示の一連の流れ
- リセット機能の動作確認

### E2Eテスト
- 複数回の鑑定実行
- レスポンシブ表示確認

## 備考

- 画像ファイルは著作権に注意（個人利用の範囲で使用）
- 商用利用の場合は権利関係を確認すること
- アニメーションの速度は調整可能にしておく

# 購物車應用程式 - Buy You Desire

使用 React + Redux + TypeScript + Vite 構建的電商購物車應用程式。

## 🚀 GitHub Pages 部署

### 自動部署 (推薦)

1. **推送到 GitHub**：

   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **啟用 GitHub Pages**：
   - 前往 GitHub 倉庫設定頁面
   - 點擊 "Pages" 選項
   - Source 選擇 "GitHub Actions"
   - 專案會自動部署到 `https://Retsomm.github.io/Buy_You_Desire/`

### 手動部署

```bash
# 建構專案
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 🛠️ 開發環境

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 建構生產版本

```bash
npm run build
```

### 預覽建構結果

```bash
npm run preview
```

### 代碼檢查

```bash
npm run lint
```

## 📦 技術架構

### 前端框架

- **React 19.1.1** - 主要 UI 框架
- **TypeScript** - 類型安全的開發
- **Vite 7.1.7** - 快速建構工具
- **Sass** - CSS 預處理器

### 狀態管理

- **Redux 5.0.1** - 應用程式狀態管理
- **Redux Thunk 3.1.0** - 處理異步操作
- **React-Redux 9.2.0** - React 與 Redux 的連接

### UI 組件

- **Ant Design 5.27.4** - UI 組件庫
- **React Hot Toast 2.6.0** - 通知訊息
- **React Router Dom 7.9.3** - 路由管理

## 🎯 功能特色

- ✅ 購物車狀態管理 (Redux)
- ✅ 本地存儲持久化 (localStorage)
- ✅ 響應式設計
- ✅ TypeScript 類型安全
- ✅ 組件懶加載
- ✅ 自定義粉紅色主題
- ✅ GitHub Pages 自動部署
- ❌ Firebase 已移除

## 📁 專案結構

```
src/
├── components/         # 可重用組件
├── hooks/             # 自定義 Hook (含類型安全的 Redux Hooks)
├── pages/             # 頁面組件
├── store/             # Redux 狀態管理
│   ├── actions/       # Action Creators
│   ├── reducers/      # Reducers
│   └── types/         # TypeScript 類型定義
├── styles/            # 樣式文件
└── utils/             # 工具函數
```

## 🔧 配置說明

### Vite 配置

- 設定 `base: '/Buy_You_Desire/'` 以支援 GitHub Pages
- 代碼分割優化：vendor、redux、ui 分包
- 輸出目錄：`dist`

### Redux 狀態

目前包含購物車狀態管理：

- `items` - 購物車商品列表
- `totalQuantity` - 總商品數量
- `totalPrice` - 總價格

### GitHub Actions

自動部署工作流程：

- 觸發條件：推送到 `main` 分支
- 建構環境：Ubuntu + Node.js 20
- 自動部署到 `gh-pages` 分支

## 📝 更新歷史

- ✅ 移除 Firebase 依賴
- ✅ 設定 GitHub Pages 部署
- ✅ 修正 Redux 狀態管理結構
- ✅ 優化建構配置
- ✅ 加入代碼分割

## 🌐 部署網址

https://Retsomm.github.io/Buy_You_Desire/

# pazdmain 專案分析報告

本報告詳細分析了 `pazdmain` 專案的技術架構、目錄結構與核心功能。

## 1. 專案概述
`pazdmain` 是一個基於 Vue 3 開發的**醫療陪診管理系統**。該系統旨在提供管理員與工作人員一個統一的界面，用於管理訂單、醫護人員、菜單權限以及查看統計數據。

## 2. 技術棧
- **前端框架**: Vue 3 (Composition API)
- **UI 組件庫**: Element Plus
- **狀態管理**: Vuex 4
- **路由管理**: Vue Router 4
- **網路請求**: Axios
- **構建工具**: Vue CLI (Webpack)
- **樣式預處理**: Less
- **工具庫**: Day.js (日期处理)

## 3. 目錄結構分析
```text
pazdmain/
├── src/
│   ├── api/            # 封裝 API 請求
│   ├── assets/         # 靜態資源（圖片、字體等）
│   ├── components/     # 全局通用的 UI 組件
│   ├── router/         # 路由配置與導航守衛
│   ├── store/          # Vuex 狀態管理（如：菜單切換、選擇狀態）
│   ├── utils/          # 封裝工具類（如：Axios 攔截器）
│   ├── views/          # 頁面組件
│   │   ├── auth/       # 權限管理（帳號、菜單）
│   │   ├── dashboard/  # 儀表板
│   │   ├── Login/      # 登入頁面
│   │   ├── vppz/       # 陪診核心業務（訂單管理、人員管理）
│   │   └── MainPage.vue # 佈局組件
│   ├── App.vue         # 根組件
│   └── main.js         # 入口文件
├── package.json        # 依賴管理與腳本配置
└── vue.config.js       # Vue CLI 配置
```

## 4. 核心功能模塊
- **登入與身份驗證**: 
  - 支持驗證碼獲取與登入。
  - 使用 `localStorage` 存儲 JWT Token。
  - 路由守衛（Navigation Guards）處理未授權重定向。
- **儀表板 (Dashboard)**: 用於展示系統統計數據與報表。
- **權限管理 (Auth Management)**:
  - **帳號管理**: 編輯管理員帳號。
  - **菜單管理**: 動態配置系統菜單。
- **陪診業務管理 (VPPZ)**:
  - **訂單管理**: 處理陪護訂單。
  - **人員管理**: 管理陪診工作人員信息。

## 5. 技術亮點與實現細節
- **Axios 攔截器**: 
  - 自動在請求頭中注入 `x-token`。
  - 統一處理回應錯誤（如：當 code 為 -2 時自動清除 Token 並跳轉至登入頁）。
- **響應式佈局**: 
  - 使用 Vuex 管理側邊欄的摺疊狀態 (`isCollapse`)。
- **Element Plus 整合**:
  - 全局註冊了 Element Plus 圖標。
  - 使用了專案自定義的 `PaneHead` 組件來保持 UI 一致性。

## 6. 部署信息
項目配置了 `gh-pages`，可以通過 `npm run deploy` 輕鬆將專案部署到 GitHub Pages。

---
報告產生時間: 2026-01-25
分析人員: Antigravity AI

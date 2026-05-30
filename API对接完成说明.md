# 智慧社区前后端API对接说明

## 对接完成日期
2026年5月29日

## 一、H5居民端 API对接（h5.html）

### 1. 新增功能

#### API基础配置
- 定义 `API_BASE = ''`（同源，无需跨域）
- 添加统一 `api()` 请求函数，支持GET/POST/PUT
- 添加后端连接状态检测机制

#### 后端连接状态指示器
- 页面右上角显示连接状态（绿色=已连接/灰色=演示模式）
- 启动时自动检测 `/api/stats/snapshot` 判断后端状态

### 2. 各模块API对接

| 模块 | API端点 | 功能 |
|------|---------|------|
| 家政预约 | `POST /api/housekeeping/orders` | 创建家政订单 |
| 食堂订餐 | `GET /api/canteen/dishes` | 获取菜单 |
| 食堂订餐 | `POST /api/canteen/orders` | 创建订餐订单 |
| 报修申请 | `POST /api/repair/orders` | 创建报修工单 |
| 物业缴费 | `GET /api/property/fees` | 获取待缴费账单 |
| 物业缴费 | `POST /api/property/fees/{id}/pay` | 缴费 |
| 访客邀请 | `POST /api/visitor/records` | 登记访客 |
| SOS紧急 | `POST /api/sos/alert` | 触发SOS呼叫 |

### 3. 默认用户信息
```javascript
const DEFAULT_USER = {
    name: '张明华',
    phone: '138****5678',
    address: '东湖社区3栋2单元501',
    building: '3栋',
    unit: '2单元',
    room: '501'
};
```

### 4. 降级处理
- 后端未连接时进入"演示模式"
- 所有表单仍可填写并显示成功提示
- Toast提示区分成功/失败样式

## 二、PC管理端实时通知（index.html）

### 1. 轮询机制
- 每5秒轮询 `/api/stats/snapshot` 获取最新状态
- 对比上次快照检测新增事件
- 检测到变化时弹出通知

### 2. 通知类型

| 类型 | 样式 | 图标 | 点击跳转 |
|------|------|------|----------|
| 新订单 | 蓝色边框 | 📋 | 家政服务模块 |
| 新报修 | 橙色边框 | 🔧 | 报修管理模块 |
| SOS告警 | 红色边框+闪烁 | 🆘 | 康养SOS模块 |
| 新订餐 | 浅绿边框 | 🍽️ | 食堂订餐模块 |

### 3. 通知特性
- 右侧弹出动画入场
- SOS有震动/闪烁效果+提示音
- 5秒后自动消失
- 可点击跳转到对应模块
- 可手动关闭

### 4. 数据看板联动
- 新事件触发时更新看板数字
- 显示未处理数量徽章

## 三、后端API补充（app.py）

### 1. 新增API端点

#### SOS紧急呼叫（简化版）
```
POST /api/sos/alert
```
请求参数：
```json
{
    "resident_name": "张明华",
    "resident_phone": "138****5678",
    "location": "东湖社区3栋2单元501",
    "alert_type": "紧急求助",
    "urgency": "high"
}
```

#### 统计快照（用于轮询）
```
GET /api/stats/snapshot
```
返回：
```json
{
    "code": 0,
    "data": {
        "pending_orders": 5,
        "pending_repairs": 2,
        "pending_sos": 1,
        "pending_canteen": 3,
        "unread_messages": 2,
        "timestamp": "2026-05-29T10:30:00"
    }
}
```

## 四、演示流程

### 完整演示步骤

1. **启动后端服务**
   ```bash
   cd 家政服务
   python app.py
   ```

2. **打开PC管理端**
   - 访问 http://localhost:8888/static/index.html
   - 确认右上角无通知弹出（初始状态）

3. **打开H5居民端**
   - 访问 http://localhost:8888/static/h5.html
   - 确认右上角显示"已连接后端"（绿色）

4. **演示家政预约**
   - 在H5端点击"家政预约"
   - 选择服务类型，点击"提交预约"
   - 5秒内PC端右上角弹出蓝色"新订单"通知

5. **演示SOS紧急呼叫**
   - 在H5端点击"康养服务" → "SOS紧急求助"
   - 确认发起SOS
   - PC端立即弹出红色闪烁"SOS紧急呼叫"通知

6. **演示报修**
   - 在H5端点击"报修申请"
   - 填写信息并提交
   - PC端弹出橙色"新报修"通知

## 五、文件清单

| 文件 | 大小 | 说明 |
|------|------|------|
| app.py | 93KB | Flask后端（新增2个API） |
| static/h5.html | 75KB | H5居民端（API对接完成） |
| static/index.html | 188KB | PC管理端（实时通知完成） |

## 六、注意事项

1. **同源策略**：H5和PC都从Flask的static目录提供，API调用无需CORS
2. **演示模式**：后端未启动时，H5端所有功能仍可演示
3. **轮询频率**：PC端5秒轮询一次，平衡实时性和性能
4. **SOS效果**：包含声音提示和视觉闪烁，是演示核心亮点

#!/bin/bash

# 智慧社区物业管理平台 - 启动脚本

echo "========================================"
echo "智慧社区物业管理平台 - 全栈Demo启动"
echo "========================================"

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 检查Python环境
if ! command -v python3 &> /dev/null; then
    echo "[错误] 未找到Python3，请先安装Python3"
    exit 1
fi

# 安装依赖
echo ""
echo "[1/4] 检查并安装依赖..."
/usr/bin/python3 -m pip install flask flask-cors -q 2>/dev/null
if [ $? -eq 0 ]; then
    echo "      ✓ 依赖安装完成"
else
    echo "      ⚠ 依赖安装遇到问题，尝试继续启动..."
fi

# 创建必要目录
echo ""
echo "[2/4] 创建数据目录..."
mkdir -p data
mkdir -p static
echo "      ✓ 目录创建完成"

# 检查端口
echo ""
echo "[3/4] 检查端口占用..."
if lsof -Pi :8888 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "      ⚠ 端口8888已被占用，将尝试使用其他端口"
    PORT_WARNING=1
else
    echo "      ✓ 端口8888可用"
fi

# 启动服务
echo ""
echo "[4/4] 启动Flask服务..."
echo ""
echo "========================================"
echo "  🎉 启动成功！"
echo ""
echo "  请在浏览器中访问:"
echo "  👉 http://localhost:8888"
echo ""
echo "  按 Ctrl+C 可停止服务"
echo "========================================"
echo ""

# 启动Flask
/usr/bin/python3 app.py

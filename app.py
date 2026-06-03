"""
智慧社区物业管理平台 - 完整11个模块后端API
Flask + SQLite 全栈Demo
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__, static_folder='static')
CORS(app)

# 数据库路径
DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'community.db')

def get_db():
    """获取数据库连接"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """初始化数据库和模拟数据"""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db()
    cursor = conn.cursor()
    
    # ============ 家政服务模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS housekeeping_orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT UNIQUE NOT NULL,
            service_type TEXT NOT NULL,
            service_type_name TEXT NOT NULL,
            book_date TEXT NOT NULL,
            book_time TEXT NOT NULL,
            contact_name TEXT NOT NULL,
            contact_phone TEXT NOT NULL,
            address TEXT NOT NULL,
            area TEXT,
            remark TEXT,
            amount REAL DEFAULT 0,
            status TEXT DEFAULT 'pending',
            staff_id INTEGER,
            staff_name TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            completed_at TEXT,
            rating INTEGER,
            review TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS service_staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            service_type TEXT NOT NULL,
            phone TEXT,
            experience TEXT,
            rating REAL DEFAULT 5.0,
            status TEXT DEFAULT 'available',
            avatar_color TEXT
        )
    ''')
    
    # ============ 食堂管理模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS canteen_dishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT,
            price REAL NOT NULL,
            unit TEXT DEFAULT '份',
            nutrition_info TEXT,
            today_sales INTEGER DEFAULT 0,
            status TEXT DEFAULT 'available',
            image TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS health_orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT UNIQUE NOT NULL,
            service_type TEXT NOT NULL,
            service_type_name TEXT NOT NULL,
            book_date TEXT NOT NULL,
            book_time TEXT NOT NULL,
            contact_name TEXT NOT NULL,
            contact_phone TEXT NOT NULL,
            address TEXT NOT NULL,
            remark TEXT,
            status TEXT DEFAULT 'pending',
            staff_id INTEGER,
            staff_name TEXT,
            completed_at TEXT,
            rating INTEGER,
            review TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
        ''')
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS canteen_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_no TEXT UNIQUE NOT NULL,
        customer_name TEXT NOT NULL,
        customer_phone TEXT,
        dishes TEXT NOT NULL,
        meal_type TEXT,
        amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        completed_at TEXT,
        remark TEXT
    )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS canteen_menus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            menu_date TEXT NOT NULL,
            meal_type TEXT NOT NULL,
            dishes TEXT NOT NULL,
            price REAL DEFAULT 0,
            calories TEXT,
            status TEXT DEFAULT 'available',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS canteen_gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            desc TEXT,
            icon TEXT,
            bg TEXT,
            sort INTEGER DEFAULT 10,
            status TEXT DEFAULT 'active',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT,
            unit TEXT DEFAULT 'kg',
            stock REAL DEFAULT 0,
            min_stock REAL DEFAULT 10,
            price REAL DEFAULT 0,
            supplier TEXT,
            expire_date TEXT,
            status TEXT DEFAULT 'normal',
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 物业缴费模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS property_fees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fee_no TEXT UNIQUE NOT NULL,
            resident_name TEXT NOT NULL,
            resident_phone TEXT,
            building TEXT NOT NULL,
            unit TEXT NOT NULL,
            room_no TEXT NOT NULL,
            fee_type TEXT NOT NULL,
            fee_period TEXT NOT NULL,
            amount REAL NOT NULL,
            paid_amount REAL DEFAULT 0,
            status TEXT DEFAULT 'unpaid',
            due_date TEXT,
            paid_date TEXT,
            payment_method TEXT,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 报修管理模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS repair_orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT UNIQUE NOT NULL,
            resident_name TEXT NOT NULL,
            resident_phone TEXT NOT NULL,
            building TEXT NOT NULL,
            unit TEXT,
            room_no TEXT,
            repair_type TEXT NOT NULL,
            repair_desc TEXT,
            urgency TEXT DEFAULT 'normal',
            status TEXT DEFAULT 'pending',
            assignee_id INTEGER,
            assignee_name TEXT,
            appointment_time TEXT,
            completed_at TEXT,
            rating INTEGER,
            review TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 访客管理模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS visitor_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            visitor_name TEXT NOT NULL,
            visitor_phone TEXT,
            visitor_id_no TEXT,
            visited_building TEXT NOT NULL,
            visited_unit TEXT,
            visited_room TEXT,
            visited_resident TEXT,
            visit_purpose TEXT,
            entry_time TEXT,
            exit_time TEXT,
            status TEXT DEFAULT 'inside',
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 公告通知模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS announcements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT,
            category TEXT DEFAULT 'normal',
            is_top INTEGER DEFAULT 0,
            is_urgent INTEGER DEFAULT 0,
            publisher TEXT,
            view_count INTEGER DEFAULT 0,
            status TEXT DEFAULT 'published',
            published_at TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 车位管理模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS parking_spaces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            space_no TEXT UNIQUE NOT NULL,
            area TEXT,
            space_type TEXT DEFAULT 'normal',
            status TEXT DEFAULT 'available',
            plate_no TEXT,
            resident_name TEXT,
            resident_phone TEXT,
            monthly_fee REAL DEFAULT 300,
            card_start_date TEXT,
            card_end_date TEXT,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS parking_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            record_no TEXT UNIQUE NOT NULL,
            plate_no TEXT NOT NULL,
            space_no TEXT,
            entry_time TEXT,
            exit_time TEXT,
            duration INTEGER,
            fee REAL DEFAULT 0,
            status TEXT DEFAULT 'parking',
            payment_status TEXT DEFAULT 'unpaid',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 康养服务模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS health_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            resident_name TEXT NOT NULL,
            resident_phone TEXT,
            building TEXT,
            room_no TEXT,
            record_type TEXT NOT NULL,
            record_value TEXT NOT NULL,
            record_time TEXT,
            is_abnormal INTEGER DEFAULT 0,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS care_plans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plan_no TEXT UNIQUE NOT NULL,
            resident_name TEXT NOT NULL,
            resident_phone TEXT,
            building TEXT,
            room_no TEXT,
            care_type TEXT NOT NULL,
            care_content TEXT,
            frequency TEXT,
            start_date TEXT,
            end_date TEXT,
            assignee_id INTEGER,
            assignee_name TEXT,
            status TEXT DEFAULT 'active',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sos_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sos_no TEXT UNIQUE NOT NULL,
            resident_name TEXT NOT NULL,
            resident_phone TEXT,
            sos_location TEXT,
            sos_reason TEXT,
            urgency TEXT DEFAULT 'high',
            status TEXT DEFAULT 'pending',
            handler_name TEXT,
            handle_result TEXT,
            handle_time TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 社区活动模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity_no TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            content TEXT,
            activity_type TEXT,
            location TEXT,
            start_time TEXT,
            end_time TEXT,
            organizer TEXT,
            max_participants INTEGER,
            current_participants INTEGER DEFAULT 0,
            fee REAL DEFAULT 0,
            cover_image TEXT,
            status TEXT DEFAULT 'published',
            published_at TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS activity_registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity_id INTEGER,
            resident_name TEXT NOT NULL,
            resident_phone TEXT,
            participants INTEGER DEFAULT 1,
            fee REAL DEFAULT 0,
            payment_status TEXT DEFAULT 'paid',
            status TEXT DEFAULT 'registered',
            registered_at TEXT,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # ============ 安防监控模块 ============
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS access_control_devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_no TEXT UNIQUE NOT NULL,
            device_name TEXT NOT NULL,
            location TEXT,
            device_type TEXT,
            status TEXT DEFAULT 'online',
            last_access_time TEXT,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS access_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            record_no TEXT UNIQUE NOT NULL,
            device_no TEXT,
            device_name TEXT,
            person_name TEXT,
            person_type TEXT,
            access_type TEXT,
            access_result TEXT,
            access_time TEXT,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS monitoring_points (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            point_no TEXT UNIQUE NOT NULL,
            point_name TEXT NOT NULL,
            location TEXT,
            status TEXT DEFAULT 'online',
            last_check_time TEXT,
            alert_count INTEGER DEFAULT 0,
            remark TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS alert_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            alert_no TEXT UNIQUE NOT NULL,
            point_no TEXT,
            point_name TEXT,
            alert_type TEXT,
            alert_level TEXT,
            alert_desc TEXT,
            status TEXT DEFAULT 'pending',
            handler_name TEXT,
            handle_result TEXT,
            handle_time TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    
    # ===== 社区医生管理模块 =====
    # 社区医生表
    cursor.execute('''CREATE TABLE IF NOT EXISTS community_doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT,
        dept TEXT,
        hospital TEXT,
        phone TEXT,
        work_time TEXT,
        specialties TEXT,
        bio TEXT,
        avatar TEXT,
        status TEXT DEFAULT 'active',
        signing_count INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')

    # 医生预约表
    cursor.execute('''CREATE TABLE IF NOT EXISTS doctor_appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        doctor_name TEXT NOT NULL,
        resident_name TEXT NOT NULL,
        resident_phone TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        symptom TEXT,
        status TEXT DEFAULT 'pending',
        reply TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')

    # 签约管理表
    cursor.execute('''CREATE TABLE IF NOT EXISTS community_signings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resident_name TEXT NOT NULL,
        resident_phone TEXT,
        doctor_id INTEGER,
        doctor_name TEXT,
        signing_date TEXT,
        valid_from TEXT,
        valid_until TEXT,
        service_package TEXT,
        status TEXT DEFAULT 'active',
        remark TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # 随访管理表
    cursor.execute('''CREATE TABLE IF NOT EXISTS community_followups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER,
        doctor_name TEXT,
        resident_name TEXT NOT NULL,
        resident_phone TEXT,
        followup_date TEXT,
        followup_type TEXT,
        followup_type_name TEXT,
        assessment TEXT,
        next_followup TEXT,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # 异常预警表
    cursor.execute('''CREATE TABLE IF NOT EXISTS community_alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alert_type TEXT,
        alert_type_name TEXT,
        resident_name TEXT NOT NULL,
        resident_phone TEXT,
        measurement TEXT,
        threshold TEXT,
        alert_level TEXT,
        alert_level_name TEXT,
        alert_time TEXT,
        status TEXT DEFAULT 'pending',
        handled_by TEXT,
        handled_note TEXT,
        handled_at TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # 在线问诊表
    cursor.execute('''CREATE TABLE IF NOT EXISTS community_consultations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER,
        doctor_name TEXT,
        resident_name TEXT NOT NULL,
        resident_phone TEXT,
        consult_date TEXT,
        consult_time TEXT,
        symptom TEXT,
        doctor_reply TEXT,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')
    # ============ 居民端：家庭成员表 ============
    cursor.execute('''CREATE TABLE IF NOT EXISTS family_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resident_name TEXT NOT NULL,
        relation TEXT NOT NULL,
        gender TEXT,
        birth_date TEXT,
        phone TEXT,
        id_card TEXT,
        health_status TEXT,
        remark TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')

    # ============ 居民端：收货地址表 ============
    cursor.execute('''CREATE TABLE IF NOT EXISTS shipping_addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_name TEXT NOT NULL,
        contact_phone TEXT NOT NULL,
        province TEXT,
        city TEXT,
        district TEXT,
        detail_address TEXT NOT NULL,
        is_default INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')

    # ============ 居民端：健康档案主表 ============
    cursor.execute('''CREATE TABLE IF NOT EXISTS health_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resident_name TEXT NOT NULL,
        gender TEXT,
        birth_date TEXT,
        height REAL,
        weight REAL,
        bmi REAL,
        blood_type TEXT,
        allergies TEXT,
        chronic_diseases TEXT,
        medications TEXT,
        last_exam_date TEXT,
        exam_summary TEXT,
        remark TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )''')
        # 检查是否已有数据
    # 兼容性处理：为旧数据库添加缺失的列
    try:
        cursor.execute("ALTER TABLE health_orders ADD COLUMN created_at TEXT DEFAULT CURRENT_TIMESTAMP")
    except:
        pass  # 列已存在
    
    cursor.execute('SELECT COUNT(*) FROM housekeeping_orders')
    if cursor.fetchone()[0] == 0:
        init_mock_data(conn)
    
    conn.commit()
    conn.close()

def init_mock_data(conn):
    """初始化模拟数据"""
    cursor = conn.cursor()
    today = datetime.now()
    
    # ============ 家政服务模拟数据 ============
    service_types = {
        'cleaning': {'name': '日常保洁', 'price': 160, 'duration': '2小时'},
        'nanny': {'name': '月嫂服务', 'price': 5800, 'duration': '1月'},
        'repair': {'name': '家电维修', 'price': 200, 'duration': '1次'},
        'eldercare': {'name': '养老陪护', 'price': 300, 'duration': '2小时'},
        'cooking': {'name': '做饭钟点工', 'price': 100, 'duration': '1次'},
        'move': {'name': '搬家服务', 'price': 300, 'duration': '1次'},
        'wash': {'name': '清洗服务', 'price': 120, 'duration': '1次'},
        'pet': {'name': '宠物照顾', 'price': 60, 'duration': '1小时'}
    }
    
    staff_data = [
        ('张小燕', '日常保洁', '158****3210', '5年经验', 4.9, 'green'),
        ('李师傅', '家电维修', '159****4321', '8年经验', 4.8, 'blue'),
        ('王阿姨', '月嫂服务', '136****5432', '持证上岗', 5.0, 'orange'),
        ('陈大姐', '养老陪护', '137****6543', '专业护理', 4.7, 'purple'),
        ('刘师傅', '搬家服务', '138****7654', '10年经验', 4.9, 'green'),
        ('周师傅', '清洗服务', '139****8765', '6年经验', 4.6, 'blue'),
    ]
    
    for staff in staff_data:
        cursor.execute('''
            INSERT INTO service_staff (name, service_type, phone, experience, rating, avatar_color)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', staff)
    
    customers = [
        ('李明华', '138****6789', '碧水园3栋2单元1501', '50-80㎡'),
        ('王建国', '139****2234', '翠湖居5栋1单元802', '80-120㎡'),
        ('张秀英', '136****8876', '怡景苑7栋3单元1102', '50㎡以下'),
        ('陈桂兰', '135****4532', '幸福里2栋1单元501', '120-150㎡'),
        ('刘德华', '137****9988', '阳光城4栋2单元601', '80-120㎡'),
        ('周润发', '158****7766', '绿景花园1栋3单元901', '50-80㎡'),
        ('吴亦凡', '159****6655', '御景湾6栋1单元1201', '150㎡以上'),
        ('成龙', '186****5544', '碧桂园8栋2单元1801', '80-120㎡'),
        ('李连杰', '187****3322', '金地花园3栋4单元601', '50-80㎡'),
        ('甄子丹', '188****1100', '万科城5栋1单元801', '120-150㎡'),
        ('赵丽颖', '189****2277', '保利公园9栋3单元1001', '80-120㎡'),
        ('杨幂', '158****3388', '华润城7栋2单元1502', '50-80㎡'),
        ('迪丽热巴', '159****4499', '龙湖天街2栋1单元601', '50㎡以下'),
        ('Angelababy', '186****5566', '中海国际4栋5单元1101', '120-150㎡'),
        ('范冰冰', '187****7788', '绿地中心1栋3单元901', '80-120㎡'),
    ]
    
    order_statuses = ['pending', 'accepted', 'processing', 'pending_review', 'completed']
    
    for i, customer in enumerate(customers):
        service_key = random.choice(list(service_types.keys()))
        service = service_types[service_key]
        status = order_statuses[i % len(order_statuses)]
        
        book_date = (today + timedelta(days=random.randint(-5, 2))).strftime('%Y-%m-%d')
        book_time = f"{random.randint(8, 16)}:00 - {random.randint(10, 18)}:00"
        
        staff_id = random.randint(1, 6) if status != 'pending' else None
        staff_name = None
        if staff_id:
            cursor.execute('SELECT name FROM service_staff WHERE id = ?', (staff_id,))
            row = cursor.fetchone()
            if row:
                staff_name = row[0]
        
        order_no = f"JZ{today.strftime('%Y%m%d')}{i+1:02d}"
        
        completed_at = None
        rating = None
        review = None
        if status == 'pending_review':
            rating = random.randint(4, 5)
            review = random.choice(['服务很好，很满意！', '非常专业，推荐！', '态度好，效率高'])
        elif status == 'completed':
            rating = random.randint(4, 5)
            review = random.choice(['非常满意！', '服务一流', '五星好评'])
            completed_at = (today - timedelta(days=random.randint(1, 3))).strftime('%Y-%m-%d %H:%M')
        
        cursor.execute('''
            INSERT INTO housekeeping_orders 
            (order_no, service_type, service_type_name, book_date, book_time, contact_name, contact_phone, address, area, amount, status, staff_id, staff_name, completed_at, rating, review)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (order_no, service_key, service['name'], book_date, book_time, 
              customer[0], customer[1], customer[2], customer[3], 
              service['price'], status, staff_id, staff_name, completed_at, rating, review))
    
    # ============ 食堂管理模拟数据 ============
    dishes_data = [
        ('红烧肉', '荤菜', 28, '份', '热量: 485kcal', 86),
        ('清蒸鲈鱼', '荤菜', 35, '份', '热量: 156kcal', 72),
        ('糖醋排骨', '荤菜', 38, '份', '热量: 320kcal', 65),
        ('宫保鸡丁', '荤菜', 25, '份', '热量: 210kcal', 58),
        ('水煮牛肉', '荤菜', 42, '份', '热量: 280kcal', 52),
        ('鱼香肉丝', '荤菜', 22, '份', '热量: 180kcal', 55),
        ('麻婆豆腐', '素菜', 15, '份', '热量: 120kcal', 45),
        ('番茄炒蛋', '素菜', 12, '份', '热量: 95kcal', 68),
        ('酸辣土豆丝', '素菜', 10, '份', '热量: 80kcal', 52),
        ('清炒时蔬', '素菜', 8, '份', '热量: 45kcal', 42),
        ('凉拌黄瓜', '凉菜', 8, '份', '热量: 30kcal', 38),
        ('凉拌木耳', '凉菜', 10, '份', '热量: 35kcal', 32),
        ('紫菜蛋花汤', '汤类', 5, '份', '热量: 25kcal', 75),
        ('西红柿鸡蛋汤', '汤类', 5, '份', '热量: 30kcal', 68),
        ('玉米排骨汤', '汤类', 15, '份', '热量: 85kcal', 35),
        ('米饭', '主食', 2, '碗', '热量: 116kcal', 120),
        ('馒头', '主食', 1, '个', '热量: 110kcal', 45),
        ('面条', '主食', 8, '份', '热量: 280kcal', 38),
        ('小米粥', '主食', 3, '份', '热量: 60kcal', 55),
        ('可乐鸡翅', '荤菜', 32, '份', '热量: 290kcal', 42),
    ]
    
    for dish in dishes_data:
        cursor.execute('''
            INSERT INTO canteen_dishes (name, category, price, unit, nutrition_info, today_sales)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', dish)
    
    meal_types = ['早餐', '午餐', '晚餐']
    
    for i, customer in enumerate(customers[:15]):
        num_dishes = random.randint(1, 3)
        selected_dishes = random.sample(dishes_data[:15], num_dishes)
        dishes_str = '+'.join([d[0] for d in selected_dishes])
        total_amount = sum([d[2] for d in selected_dishes])
        
        meal_type = random.choice(meal_types)
        order_status = random.choice(['pending', 'confirmed', 'completed'])
        
        order_no = f"DC{today.strftime('%Y%m%d')}{i+1:02d}"
        created_at = (today - timedelta(hours=random.randint(0, 12))).strftime('%Y-%m-%d %H:%M')
        
        cursor.execute('''
            INSERT INTO canteen_orders (order_no, customer_name, customer_phone, dishes, meal_type, amount, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (order_no, customer[0], customer[1], dishes_str, meal_type, total_amount, order_status, created_at))
    
    ingredients_data = [
        ('猪肉', '肉类', 'kg', 5, 20, 28, '永辉超市', None, 'low'),
        ('牛肉', '肉类', 'kg', 15, 10, 45, '华润万家', None, 'normal'),
        ('鸡肉', '肉类', 'kg', 8, 15, 18, '永辉超市', None, 'normal'),
        ('新鲜蔬菜', '蔬菜类', 'kg', 3, 20, 5, '本地农场', None, 'expire'),
        ('大米', '主食类', 'kg', 25, 50, 3.5, '粮食储备库', None, 'low'),
        ('鸡蛋', '禽蛋类', 'kg', 10, 20, 8, '华润万家', None, 'normal'),
        ('面粉', '主食类', 'kg', 40, 30, 4, '粮食储备库', None, 'normal'),
        ('食用油', '调料类', 'L', 20, 10, 15, '永辉超市', None, 'normal'),
        ('豆腐', '豆制品', 'kg', 8, 15, 6, '本地作坊', None, 'normal'),
        ('土豆', '蔬菜类', 'kg', 30, 25, 2.5, '本地农场', None, 'normal'),
        ('番茄', '蔬菜类', 'kg', 5, 15, 4, '本地农场', None, 'expire'),
        ('白菜', '蔬菜类', 'kg', 12, 20, 2, '本地农场', None, 'normal'),
    ]
    
    for ing in ingredients_data:
        cursor.execute('''
            INSERT INTO ingredients (name, category, unit, stock, min_stock, price, supplier, expire_date, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', ing)
    
    # ============ 物业缴费模拟数据 ============
    fee_types = ['物业费', '水费', '电费', '燃气费', '停车费', '垃圾清运费']
    buildings = ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋', '7栋', '8栋']
    units = ['1单元', '2单元', '3单元']
    rooms = ['101', '201', '301', '401', '501', '601', '701', '801', '901', '1001']
    
    for i in range(20):
        fee_type = random.choice(fee_types)
        building = random.choice(buildings)
        unit = random.choice(units)
        room = random.choice(rooms)
        resident = random.choice(customers)
        
        if fee_type == '物业费':
            amount = random.randint(200, 500)
        elif fee_type == '水费':
            amount = random.randint(50, 150)
        elif fee_type == '电费':
            amount = random.randint(100, 300)
        elif fee_type == '燃气费':
            amount = random.randint(30, 80)
        elif fee_type == '停车费':
            amount = 300
        else:
            amount = random.randint(20, 50)
        
        status = random.choice(['unpaid', 'paid', 'paid', 'overdue'])
        period = f"{today.strftime('%Y年%m月')}"
        due_date = (today + timedelta(days=random.randint(1, 15))).strftime('%Y-%m-%d')
        
        fee_no = f"WY{today.strftime('%Y%m%d')}{i+1:02d}"
        
        paid_date = None
        payment_method = None
        if status == 'paid':
            paid_date = (today - timedelta(days=random.randint(1, 10))).strftime('%Y-%m-%d')
            payment_method = random.choice(['微信支付', '支付宝', '银行转账', '现金'])
        
        cursor.execute('''
            INSERT INTO property_fees 
            (fee_no, resident_name, resident_phone, building, unit, room_no, fee_type, fee_period, amount, status, due_date, paid_date, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (fee_no, resident[0], resident[1], building, unit, room, fee_type, period, amount, status, due_date, paid_date, payment_method))
    
    # ============ 报修管理模拟数据 ============
    repair_types = ['水电维修', '门窗维修', '家电维修', '下水道堵塞', '墙面修补', '灯具维修', '门锁维修', '公共设施']
    urgency_levels = ['low', 'normal', 'high', 'urgent']
    
    for i in range(15):
        repair_type = random.choice(repair_types)
        resident = random.choice(customers)
        building = random.choice(buildings)
        unit = random.choice(units)
        room = random.choice(rooms)
        urgency = random.choice(urgency_levels)
        status = random.choice(['pending', 'assigned', 'processing', 'completed', 'completed'])
        
        order_no = f"BX{today.strftime('%Y%m%d')}{i+1:02d}"
        appointment = (today + timedelta(days=random.randint(0, 2))).strftime('%Y-%m-%d %H:%M')
        
        assignee_id = random.randint(1, 6) if status != 'pending' else None
        assignee_name = None
        if assignee_id:
            cursor.execute('SELECT name FROM service_staff WHERE id = ?', (assignee_id,))
            row = cursor.fetchone()
            if row:
                assignee_name = row[0]
        
        completed_at = None
        rating = None
        review = None
        if status == 'completed':
            completed_at = (today - timedelta(days=random.randint(0, 3))).strftime('%Y-%m-%d %H:%M')
            rating = random.randint(3, 5)
            review = random.choice(['维修及时，服务好', '态度认真，很满意', '很快就修好了'])
        
        repair_desc = {
            '水电维修': '水龙头漏水/插座不通电',
            '门窗维修': '门锁松动/窗户关不严',
            '家电维修': '空调不制冷/冰箱不工作',
            '下水道堵塞': '厨房下水道堵塞',
            '墙面修补': '墙面有裂缝需要修补',
            '灯具维修': '卧室灯不亮',
            '门锁维修': '防盗门锁芯损坏',
            '公共设施': '楼道灯损坏'
        }.get(repair_type, '需要维修')
        
        cursor.execute('''
            INSERT INTO repair_orders 
            (order_no, resident_name, resident_phone, building, unit, room_no, repair_type, repair_desc, urgency, status, assignee_id, assignee_name, appointment_time, completed_at, rating, review)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (order_no, resident[0], resident[1], building, unit, room, repair_type, repair_desc, urgency, status, assignee_id, assignee_name, appointment, completed_at, rating, review))
    
    # ============ 访客管理模拟数据 ============
    visitor_names = ['张伟', '李娜', '王强', '刘芳', '陈明', '杨丽', '赵磊', '黄敏', '周杰', '吴婷']
    visit_purposes = ['探亲访友', '送货安装', '快递外卖', '朋友聚会', '家政服务', '维修服务', '看房租房']
    
    for i in range(15):
        visitor_name = random.choice(visitor_names)
        visited_resident = random.choice(customers)
        building = random.choice(buildings)
        unit = random.choice(units)
        room = random.choice(rooms)
        
        entry_time = (today - timedelta(hours=random.randint(0, 48))).strftime('%Y-%m-%d %H:%M')
        status = random.choice(['inside', 'outside', 'outside', 'pending'])
        
        exit_time = None
        if status == 'outside':
            exit_time = (datetime.strptime(entry_time, '%Y-%m-%d %H:%M') + timedelta(hours=random.randint(1, 4))).strftime('%Y-%m-%d %H:%M')
        
        purpose = random.choice(visit_purposes)
        
        cursor.execute('''
            INSERT INTO visitor_records 
            (visitor_name, visitor_phone, visited_building, visited_unit, visited_room, visited_resident, visit_purpose, entry_time, exit_time, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (visitor_name, f'138****{random.randint(1000,9999)}', building, unit, room, visited_resident[0], purpose, entry_time, exit_time, status))
    
    # ============ 公告通知模拟数据 ============
    announcements = [
        ('关于缴纳2024年物业费的通知', '请各位业主于本月15日前完成物业费缴纳，可通过微信、支付宝等方式在线缴费。', 'normal', 1, 0, '物业管理处'),
        ('小区停水通知', '因市政管网改造，明天上午9:00-12:00全小区停水，请各位业主提前储水。', 'urgent', 1, 1, '物业管理处'),
        ('端午节活动邀请', '端午佳节将至，物业将于6月10日在小区广场举办包粽子活动，欢迎大家参加！', 'normal', 0, 0, '社区居委会'),
        ('电梯维保通知', '本周将对3栋、5栋电梯进行例行维保，届时电梯将暂停使用，给您带来不便请谅解。', 'normal', 0, 0, '电梯维保单位'),
        ('垃圾分类温馨提示', '请各位业主严格按照垃圾分类要求投放垃圾，共同维护小区环境。', 'normal', 0, 0, '物业管理处'),
        ('暑期兴趣班报名通知', '社区活动中心将举办暑期少儿兴趣班，包括绘画、书法、舞蹈等，即日起接受报名。', 'normal', 0, 0, '社区活动中心'),
        ('消防演习公告', '本月15日将进行消防演习，请各位业主配合，届时会有警报声，请勿惊慌。', 'normal', 0, 0, '安保部'),
        ('游泳池开放通知', '小区游泳池即日起正式开放，开放时间7:00-21:00，请遵守泳池管理规定。', 'normal', 0, 0, '物业管理处'),
        ('车辆管理系统升级', '停车场管理系统将进行升级，届时请车主及时更新车辆信息。', 'normal', 0, 0, '物业管理处'),
        ('中秋节放假安排', '中秋节期间物业服务大厅放假3天，如有紧急事务请联系24小时值班电话。', 'normal', 0, 0, '物业管理处'),
        ('疫情防控通知', '鉴于当前疫情防控形势，请各位业主继续做好个人防护，配合门禁测温。', 'urgent', 0, 1, '物业管理处'),
        ('绿化改造施工公告', '小区绿化带将进行改造施工，届时部分区域会有围挡，请注意安全。', 'normal', 0, 0, '园林绿化部'),
    ]
    
    for ann in announcements:
        published_at = (today - timedelta(days=random.randint(0, 10))).strftime('%Y-%m-%d %H:%M')
        cursor.execute('''
            INSERT INTO announcements 
            (title, content, category, is_top, is_urgent, publisher, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (*ann, published_at))
    
    # ============ 车位管理模拟数据 ============
    parking_areas = ['A区', 'B区', 'C区', '地下一层', '地下二层']
    
    for i in range(25):
        area = random.choice(parking_areas)
        space_no = f"{area}-{i+1:02d}号"
        space_type = random.choice(['normal', 'large', 'electric'])
        
        status = random.choice(['available', 'occupied', 'occupied', 'occupied', 'reserved'])
        resident = None
        plate_no = None
        card_start = None
        card_end = None
        monthly_fee = 300
        
        if status in ['occupied', 'reserved']:
            resident = random.choice(customers)
            plate_no = f"鄂A{random.randint(10000, 99999)}"
            card_start = (today - timedelta(days=random.randint(10, 180))).strftime('%Y-%m-%d')
            card_end = (today + timedelta(days=random.randint(10, 180))).strftime('%Y-%m-%d')
        
        cursor.execute('''
            INSERT INTO parking_spaces 
            (space_no, area, space_type, status, plate_no, resident_name, monthly_fee, card_start_date, card_end_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (space_no, area, space_type, status, plate_no, resident[0] if resident else None, monthly_fee, card_start, card_end))
    
    # 访客停车记录
    for i in range(12):
        record_no = f"TC{today.strftime('%Y%m%d')}{i+1:02d}"
        plate_no = f"鄂A{random.randint(10000, 99999)}"
        entry_time = (today - timedelta(hours=random.randint(0, 24))).strftime('%Y-%m-%d %H:%M')
        status = random.choice(['parking', 'exited', 'exited', 'exited'])
        
        exit_time = None
        duration = 0
        fee = 0
        if status == 'exited':
            exit_dt = datetime.strptime(entry_time, '%Y-%m-%d %H:%M') + timedelta(hours=random.randint(1, 8))
            exit_time = exit_dt.strftime('%Y-%m-%d %H:%M')
            duration = int((exit_dt - datetime.strptime(entry_time, '%Y-%m-%d %H:%M')).total_seconds() / 3600)
            fee = duration * 5
        
        cursor.execute('''
            INSERT INTO parking_records 
            (record_no, plate_no, entry_time, exit_time, duration, fee, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (record_no, plate_no, entry_time, exit_time, duration, fee, status))
    
    # ============ 康养服务模拟数据 ============
    health_types = ['血压', '血糖', '心率', '体温', '血氧']
    
    for i in range(20):
        resident = random.choice(customers)
        record_type = random.choice(health_types)
        
        if record_type == '血压':
            systolic = random.randint(90, 160)
            diastolic = random.randint(60, 100)
            record_value = f"{systolic}/{diastolic}"
            is_abnormal = 1 if systolic > 140 or diastolic > 90 else 0
        elif record_type == '血糖':
            record_value = f"{random.randint(40, 120)} mg/dL"
            is_abnormal = 1 if random.random() < 0.2 else 0
        elif record_type == '心率':
            record_value = f"{random.randint(55, 100)} 次/分"
            is_abnormal = 1 if random.random() < 0.1 else 0
        elif record_type == '体温':
            record_value = f"{random.randint(360, 375) / 10}℃"
            is_abnormal = 0
        else:
            record_value = f"{random.randint(95, 100)}%"
            is_abnormal = 0
        
        record_time = (today - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d %H:%M')
        
        cursor.execute('''
            INSERT INTO health_records 
            (resident_name, resident_phone, building, room_no, record_type, record_value, record_time, is_abnormal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (resident[0], resident[1], resident[2].split('栋')[0] + '栋', resident[2].split('单元')[0].split('栋')[1], record_type, record_value, record_time, is_abnormal))
    
    # 照护计划
    care_types = ['日常健康监测', '用药提醒', '康复训练', '心理疏导', '生活照料']
    care_staff = [('张小燕', 1), ('陈大姐', 4)]
    
    for i in range(12):
        resident = random.choice(customers)
        care_type = random.choice(care_types)
        assignee = random.choice(care_staff)
        
        plan_no = f"ZH{today.strftime('%Y%m%d')}{i+1:02d}"
        start_date = (today - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d')
        end_date = (today + timedelta(days=random.randint(30, 90))).strftime('%Y-%m-%d')
        
        care_content = {
            '日常健康监测': '每日测量血压、血糖，记录数据并上传',
            '用药提醒': '按时提醒服药，协助整理药品',
            '康复训练': '协助进行康复体操，每日2次',
            '心理疏导': '陪伴聊天，关注心理健康',
            '生活照料': '协助日常起居，打扫卫生'
        }.get(care_type, '')
        
        frequency = random.choice(['每日', '每周3次', '每周5次', '每月'])
        status = random.choice(['active', 'active', 'completed'])
        
        cursor.execute('''
            INSERT INTO care_plans 
            (plan_no, resident_name, resident_phone, building, room_no, care_type, care_content, frequency, start_date, end_date, assignee_id, assignee_name, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (plan_no, resident[0], resident[1], resident[2].split('栋')[0] + '栋', resident[2].split('单元')[0].split('栋')[1], care_type, care_content, frequency, start_date, end_date, assignee[1], assignee[0], status))
    
    # SOS紧急呼叫记录
    sos_reasons = ['身体不适', '摔倒', '胸闷气短', '头晕', '其他紧急情况']
    
    for i in range(10):
        resident = random.choice(customers)
        sos_no = f"SOS{today.strftime('%Y%m%d')}{i+1:02d}"
        sos_reason = random.choice(sos_reasons)
        urgency = random.choice(['high', 'urgent', 'high'])
        status = random.choice(['pending', 'handling', 'handled', 'handled'])
        
        handler_name = None
        handle_result = None
        handle_time = None
        
        if status in ['handling', 'handled']:
            handlers = ['张医生', '李护士', '王急救员']
            handler_name = random.choice(handlers)
            handle_result = random.choice(['已上门查看，情况稳定', '已送医治疗', '远程指导后缓解', '误报，已处理'])
            handle_time = (today - timedelta(hours=random.randint(0, 48))).strftime('%Y-%m-%d %H:%M')
        
        cursor.execute('''
            INSERT INTO sos_records 
            (sos_no, resident_name, resident_phone, sos_location, sos_reason, urgency, status, handler_name, handle_result, handle_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (sos_no, resident[0], resident[1], resident[2], sos_reason, urgency, status, handler_name, handle_result, handle_time))
    
    # ============ 社区活动模拟数据 ============
    activities = [
        ('端午节包粽子活动', '端午节来临之际，组织社区居民一起包粽子，感受传统节日氛围', '文娱活动', '社区广场', (today + timedelta(days=5)).strftime('%Y-%m-%d 09:00'), (today + timedelta(days=5)).strftime('%Y-%m-%d 12:00'), '物业管理处', 50, 35, 0),
        ('暑期少儿绘画班', '专业绘画老师授课，培养孩子艺术兴趣', '教育培训', '社区活动中心203室', (today + timedelta(days=10)).strftime('%Y-%m-%d 14:00'), (today + timedelta(days=10)).strftime('%Y-%m-%d 16:00'), '社区活动中心', 20, 12, 100),
        ('健康义诊活动', '邀请武汉市中心医院医生为居民提供免费健康咨询服务', '健康活动', '社区卫生服务中心', (today + timedelta(days=7)).strftime('%Y-%m-%d 08:30'), (today + timedelta(days=7)).strftime('%Y-%m-%d 11:30'), '社区卫生服务中心', 100, 78, 0),
        ('广场舞培训班', '专业舞蹈老师教授广场舞基础动作', '健身活动', '小区广场', (today + timedelta(days=3)).strftime('%Y-%m-%d 19:00'), (today + timedelta(days=3)).strftime('%Y-%m-%d 20:30'), '社区舞蹈队', 40, 28, 0),
        ('亲子阅读分享会', '暑假期间组织亲子阅读，分享读书心得', '教育培训', '社区图书馆', (today + timedelta(days=14)).strftime('%Y-%m-%d 15:00'), (today + timedelta(days=14)).strftime('%Y-%m-%d 17:00'), '社区图书馆', 30, 15, 0),
        ('太极拳晨练营', '每日清晨组织太极拳晨练，锻炼身体', '健身活动', '小区花园', (today + timedelta(days=1)).strftime('%Y-%m-%d 06:30'), (today + timedelta(days=1)).strftime('%Y-%m-%d 07:30'), '社区太极拳协会', 25, 20, 0),
        ('中秋赏月晚会', '中秋佳节举办赏月晚会，有文艺表演和猜灯谜活动', '文娱活动', '社区中心花园', (today + timedelta(days=30)).strftime('%Y-%m-%d 19:00'), (today + timedelta(days=30)).strftime('%Y-%m-%d 21:30'), '社区居委会', 80, 45, 0),
        ('法律知识讲座', '邀请律师为居民讲解房产、继承等法律知识', '教育培训', '社区会议室', (today + timedelta(days=8)).strftime('%Y-%m-%d 14:00'), (today + timedelta(days=8)).strftime('%Y-%m-%d 16:00'), '司法所', 60, 32, 0),
        ('乒乓球友谊赛', '社区乒乓球爱好者友谊赛，锻炼身体增进友谊', '健身活动', '社区活动中心', (today + timedelta(days=12)).strftime('%Y-%m-%d 09:00'), (today + timedelta(days=12)).strftime('%Y-%m-%d 17:00'), '社区体育协会', 32, 24, 20),
        ('老年手机使用培训', '教老年人使用智能手机，方便与家人联系', '教育培训', '社区活动中心101室', (today + timedelta(days=6)).strftime('%Y-%m-%d 10:00'), (today + timedelta(days=6)).strftime('%Y-%m-%d 11:30'), '中国移动东湖营业厅', 25, 18, 0),
        ('美食分享会', '居民各自带来拿手菜，共同品尝美食交流厨艺', '文娱活动', '社区餐厅', (today + timedelta(days=15)).strftime('%Y-%m-%d 11:00'), (today + timedelta(days=15)).strftime('%Y-%m-%d 13:30'), '社区美食协会', 40, 30, 30),
        ('家庭园艺讲座', '专业园艺师教您打造美丽阳台花园', '教育培训', '社区活动中心', (today + timedelta(days=20)).strftime('%Y-%m-%d 14:30'), (today + timedelta(days=20)).strftime('%Y-%m-%d 16:00'), '小区园林绿化部', 35, 22, 0),
    ]
    
    for idx, act in enumerate(activities, 1):
        activity_no = f"HD{today.strftime('%Y%m%d')}{idx:02d}"
        cursor.execute('''
            INSERT INTO activities 
            (activity_no, title, content, activity_type, location, start_time, end_time, organizer, max_participants, current_participants, fee, status, published_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)
        ''', (activity_no, *act, (today - timedelta(days=random.randint(1, 10))).strftime('%Y-%m-%d %H:%M')))
    
    # 活动报名记录
    for i in range(15):
        cursor.execute('SELECT id, title, max_participants, current_participants, fee FROM activities ORDER BY id LIMIT 1 OFFSET ?', (i % 12,))
        activity = cursor.fetchone()
        if activity and activity['current_participants'] < activity['max_participants']:
            resident = random.choice(customers)
            cursor.execute('''
                INSERT INTO activity_registrations 
                (activity_id, resident_name, resident_phone, participants, fee, status, registered_at)
                VALUES (?, ?, ?, 1, ?, 'registered', ?)
            ''', (activity['id'], resident[0], resident[1], activity['fee'], (today - timedelta(days=random.randint(1, 5))).strftime('%Y-%m-%d %H:%M')))
    
    # ============ 安防监控模拟数据 ============
    # 门禁设备
    devices = [
        ('MK001', '1栋主入口门禁', '1栋', '人脸识别', 'online'),
        ('MK002', '1栋侧门门禁', '1栋', '刷卡', 'online'),
        ('MK003', '2栋主入口门禁', '2栋', '人脸识别', 'online'),
        ('MK004', '3栋主入口门禁', '3栋', '人脸识别', 'offline'),
        ('MK005', '4栋主入口门禁', '4栋', '刷卡', 'online'),
        ('MK006', '5栋主入口门禁', '5栋', '人脸识别', 'online'),
        ('MK007', '东门人行通道', '东门', '人脸+刷卡', 'online'),
        ('MK008', '西门人行通道', '西门', '人脸+刷卡', 'online'),
        ('MK009', '地下车库入口', '地库', '车牌识别', 'online'),
        ('MK010', '快递柜区域门禁', '快递区', '刷卡', 'online'),
    ]
    
    for dev in devices:
        cursor.execute('''
            INSERT INTO access_control_devices 
            (device_no, device_name, location, device_type, status, last_access_time)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (*dev, (today - timedelta(minutes=random.randint(1, 120))).strftime('%Y-%m-%d %H:%M')))
    
    # 通行记录
    person_types = ['住户', '访客', '外卖员', '快递员', '物业人员']
    access_types = ['进门', '出门']
    
    for i in range(30):
        cursor.execute('SELECT device_no, device_name FROM access_control_devices ORDER BY id LIMIT 1 OFFSET ?', (i % 10,))
        device = cursor.fetchone()
        
        record_no = f"TK{today.strftime('%Y%m%d%H%M')}{i+1:02d}"
        person_name = random.choice(customers)[0] if random.random() < 0.7 else random.choice(['外卖员张', '快递员李', '访客王'])
        person_type = random.choice(person_types)
        access_type = random.choice(access_types)
        access_time = (today - timedelta(minutes=random.randint(1, 1440))).strftime('%Y-%m-%d %H:%M')
        
        cursor.execute('''
            INSERT INTO access_records 
            (record_no, device_no, device_name, person_name, person_type, access_type, access_result, access_time)
            VALUES (?, ?, ?, ?, ?, ?, '允许', ?)
        ''', (record_no, device['device_no'], device['device_name'], person_name, person_type, access_type, access_time))
    
    # 监控点位
    points = [
        ('JC001', '1栋大厅监控', '1栋大厅', 'online'),
        ('JC002', '1栋电梯监控', '1栋电梯', 'online'),
        ('JC003', '2栋大厅监控', '2栋大厅', 'online'),
        ('JC004', '2栋电梯监控', '2栋电梯', 'online'),
        ('JC005', '3栋大厅监控', '3栋大厅', 'online'),
        ('JC006', '小区广场监控', '中心广场', 'online'),
        ('JC007', '儿童游乐区监控', '游乐区', 'online'),
        ('JC008', '东门入口监控', '东门', 'offline'),
        ('JC009', '西门入口监控', '西门', 'online'),
        ('JC010', '地下车库监控A', '地库A区', 'online'),
        ('JC011', '地下车库监控B', '地库B区', 'online'),
        ('JC012', '垃圾分类点监控', '垃圾分类区', 'online'),
    ]
    
    for pt in points:
        cursor.execute('''
            INSERT INTO monitoring_points 
            (point_no, point_name, location, status, last_check_time, alert_count)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (*pt, (today - timedelta(minutes=random.randint(1, 60))).strftime('%Y-%m-%d %H:%M'), random.randint(0, 5)))
    
    # 告警记录
    alert_types = ['人员入侵', '异常徘徊', '绊线检测', '区域入侵', '烟雾报警']
    alert_levels = ['low', 'medium', 'high']
    
    for i in range(15):
        cursor.execute('SELECT point_no, point_name FROM monitoring_points ORDER BY id LIMIT 1 OFFSET ?', (i % 12,))
        point = cursor.fetchone()
        
        alert_no = f"GJ{today.strftime('%Y%m%d')}{i+1:02d}"
        alert_type = random.choice(alert_types)
        alert_level = random.choice(alert_levels)
        alert_desc = f"{point['point_name']}检测到{alert_type}"
        status = random.choice(['pending', 'confirmed', 'handled', 'handled', 'handled'])
        
        handlers = ['李保安', '张保安', '王队长']
        
        handler_name = None
        handle_result = None
        handle_time = None
        
        if status in ['confirmed', 'handled']:
            handler_name = random.choice(handlers)
        
        if status == 'handled':
            handle_result = random.choice(['已确认为误报', '已上门查看，无异常', '已联系住户确认', '已处理完毕'])
            handle_time = (today - timedelta(hours=random.randint(1, 48))).strftime('%Y-%m-%d %H:%M')
        
        cursor.execute('''
            INSERT INTO alert_records 
            (alert_no, point_no, point_name, alert_type, alert_level, alert_desc, status, handler_name, handle_result, handle_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (alert_no, point['point_no'], point['point_name'], alert_type, alert_level, alert_desc, status, handler_name, handle_result, handle_time))
    
    # ============ 社区医生管理模拟数据 ============
    doctors_data = [
        ('张明德', '主任医师', '全科', '社区卫生服务中心', '138****1234', '周一至周五 8:00-17:00', '全科、慢性病管理', '从事社区医疗工作20年，擅长高血压、糖尿病等慢性病管理。'),
        ('李秀英', '副主任医师', '内科', '社区卫生服务中心', '139****2345', '周一至周六 8:00-16:00', '心血管疾病、老年病', '心血管内科专家，在社区开展健康讲座50余场。'),
        ('王健康', '主治医师', '中医科', '社区卫生服务中心', '137****3456', '周二至周六 9:00-17:00', '中医理疗、针灸', '中医世家，擅长针灸推拿，服务社区居民超5000人次。'),
        ('陈美兰', '副主任医师', '妇产科', '社区卫生服务中心', '136****4567', '周一至周五 8:00-16:00', '妇幼保健、产后康复', '妇产科专家，负责社区孕产妇健康管理工作。'),
        ('刘国强', '主治医师', '外科', '社区卫生服务中心', '135****5678', '周三至周日 8:00-17:00', '外伤处理、小手术', '外科主治医师，处理社区外伤病例超3000例。'),
    ]
    
    for doc in doctors_data:
        cursor.execute('''
            INSERT INTO community_doctors (name, title, dept, hospital, phone, work_time, specialties, bio, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
        ''', doc)
    
    # 签约数据
    signing_data = [
        ('张建国', '138****6789', 1, '张明德', '2025-01-15', '2025-01-15', '2026-01-15', '尊享包'),
        ('李秀英', '139****7890', 2, '李秀英', '2025-02-20', '2025-02-20', '2026-02-20', '升级包'),
        ('王小明', '137****8901', 1, '张明德', '2025-03-10', '2025-03-10', '2026-03-10', '基础包'),
        ('陈桂兰', '136****9012', 3, '王健康', '2025-01-05', '2025-01-05', '2026-01-05', '尊享包'),
        ('赵丽颖', '135****0123', 4, '陈美兰', '2025-04-01', '2025-04-01', '2026-04-01', '升级包'),
    ]
    
    for sig in signing_data:
        cursor.execute('''
            INSERT INTO community_signings (resident_name, resident_phone, doctor_id, doctor_name, signing_date, valid_from, valid_until, service_package, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
        ''', sig)
    
    # 随访数据
    followup_data = [
        (1, '张明德', '张建国', '138****6789', '2025-05-20', '上门随访', '血压随访', '血压控制良好', '2025-08-20'),
        (2, '李秀英', '李秀英', '139****7890', '2025-05-18', '电话随访', '用药指导', '需调整用药', '2025-06-18'),
        (3, '王健康', '王小明', '137****8901', '2025-05-15', '上门随访', '中医理疗', '理疗效果良好', '2025-08-15'),
        (1, '张明德', '张建国', '138****6789', '2025-06-10', 'pending', '定期随访', '-', '2025-09-10'),
    ]
    
    for fol in followup_data:
        status = 'completed' if fol[5] != 'pending' else 'pending'
        cursor.execute('''
            INSERT INTO community_followups (doctor_id, doctor_name, resident_name, resident_phone, followup_date, followup_type, followup_type_name, assessment, next_followup, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (*fol[:5], fol[5], fol[6], fol[7], fol[8], status))
    
    # 预警数据
    alert_data = [
        ('血压异常', '血压高值预警', '张建国', '138****6789', '165/95', '正常值<140/90', '2025-05-20 09:30', 'danger', '高危', 'pending'),
        ('血糖异常', '低血糖预警', '李秀英', '139****7890', '3.2', '正常值3.9-6.1', '2025-05-19 14:20', 'medium', '中危', 'pending'),
        ('心率异常', '心率过速预警', '王小明', '137****8901', '105', '正常值60-100', '2025-05-18 20:15', 'warning', '低危', 'handled'),
    ]
    
    for ale in alert_data:
        handled_by = '张明德' if ale[6] == 'handled' else None
        handled_at = '2025-05-18 21:00' if ale[6] == 'handled' else None
        cursor.execute('''
            INSERT INTO community_alerts (alert_type, alert_type_name, resident_name, resident_phone, measurement, threshold, alert_time, alert_level, alert_level_name, status, handled_by, handled_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (*ale[:6], ale[6], ale[7], ale[8], ale[9], handled_by, handled_at))
    
    # 问诊数据
    consult_data = [
        (1, '张明德', '张建国', '138****6789', '2025-05-20', '09:30', '最近血压偏高，是否需要调整用药？', None, 'pending'),
        (2, '李秀英', '李秀英', '139****7890', '2025-05-19', '15:20', '孕期血糖有点低，怎么办？', '建议少量多餐，随身带糖果', 'replied'),
        (3, '王健康', '王小明', '137****8901', '2025-05-18', '11:00', '腰痛反复发作，针灸能治好吗？', None, 'pending'),
    ]
    
    for con in consult_data:
        cursor.execute('''
            INSERT INTO community_consultations (doctor_id, doctor_name, resident_name, resident_phone, consult_date, consult_time, symptom, doctor_reply, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (*con[:7], con[7], con[8]))
    
    # ============ 健康服务订单模拟数据 ============
    health_services = [
        ('体检', '常规体检'),
        ('按摩', '穴位按摩'),
        ('理疗', '物理治疗'),
        ('健康咨询', '营养师咨询'),
    ]
    ht_customers = [
        ('张大爷', '138****1111', '碧水园1栋201'),
        ('李奶奶', '138****2222', '翠湖居2栋305'),
        ('王叔叔', '138****3333', '怡景苑3栋102'),
        ('赵阿姨', '138****4444', '幸福里5栋408'),
    ]
    ht_statuses = ['pending', 'accepted', 'processing', 'completed']
    cursor.execute('SELECT COUNT(*) FROM health_orders')
    if cursor.fetchone()[0] == 0:
        for i in range(4):
            hs = health_services[i % len(health_services)]
            c = ht_customers[i % len(ht_customers)]
            order_no = f'JK{today.strftime("%Y%m%d")}{i+1:02d}'
            bk_date = (today + timedelta(days=i)).strftime('%Y-%m-%d')
            bk_time = f'{9+i}:00'
            ht_status = ht_statuses[i % len(ht_statuses)]
            comp_at = (today + timedelta(days=i, hours=1)).strftime('%Y-%m-%d %H:%M') if ht_status == 'completed' else None
            rt = 5 if ht_status == 'completed' else None
            rv = '服务很专业，下次继续预约' if ht_status == 'completed' else None
            cursor.execute('''
                INSERT INTO health_orders
                (order_no, service_type, service_type_name, book_date, book_time,
                 contact_name, contact_phone, address, remark, status,
                 staff_id, staff_name, completed_at, rating, review)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (order_no, hs[0], hs[1], bk_date, bk_time,
                  c[0], c[1], c[2], '', ht_status,
                  None, None, comp_at, rt, rv))
        print('✅ 健康服务模拟数据已添加')
    
# ============ 静态文件服务 ============

@app.route('/')
def index():
    """主页"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    """静态文件服务"""
    return send_from_directory('static', filename)

# ============ 家政服务API ============

@app.route('/api/housekeeping/orders', methods=['GET'])
def get_housekeeping_orders():
    """获取家政订单列表"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('''
            SELECT * FROM housekeeping_orders 
            WHERE status = ? 
            ORDER BY created_at DESC
        ''', (status,))
    else:
        cursor.execute('SELECT * FROM housekeeping_orders ORDER BY created_at DESC LIMIT 10')
    
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': orders})

@app.route('/api/housekeeping/orders/all', methods=['GET'])
def get_all_housekeeping_orders():
    """获取所有家政订单"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('''
            SELECT * FROM housekeeping_orders 
            WHERE status = ? 
            ORDER BY created_at DESC
        ''', (status,))
    else:
        cursor.execute('SELECT * FROM housekeeping_orders ORDER BY created_at DESC')
    
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': orders})

@app.route('/api/housekeeping/orders', methods=['POST'])
def create_housekeeping_order():
    """创建家政订单"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM housekeeping_orders WHERE order_no LIKE ?", (f'JZ{today}%',))
    count = cursor.fetchone()[0]
    order_no = f"JZ{today}{count+1:02d}"
    
    service_prices = {
        'cleaning': 160, 'nanny': 5800, 'repair': 200, 'eldercare': 300,
        'cooking': 100, 'move': 300, 'wash': 120, 'pet': 60
    }
    service_names = {
        'cleaning': '日常保洁', 'nanny': '月嫂服务', 'repair': '家电维修', 'eldercare': '养老陪护',
        'cooking': '做饭钟点工', 'move': '搬家服务', 'wash': '清洗服务', 'pet': '宠物照顾'
    }
    
    cursor.execute('''
        INSERT INTO housekeeping_orders 
        (order_no, service_type, service_type_name, book_date, book_time, contact_name, contact_phone, address, area, remark, amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    ''', (
        order_no,
        data.get('service_type'),
        service_names.get(data.get('service_type'), '未知服务'),
        data.get('book_date'),
        data.get('book_time'),
        data.get('contact_name'),
        data.get('contact_phone'),
        data.get('address'),
        data.get('area'),
        data.get('remark', ''),
        service_prices.get(data.get('service_type'), 100)
    ))
    
    conn.commit()
    order_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '预约成功', 'data': {'id': order_id, 'order_no': order_no}})

@app.route('/api/housekeeping/orders/<int:order_id>/accept', methods=['PUT'])
def accept_housekeeping_order(order_id):
    """接单"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE housekeeping_orders 
        SET status = 'accepted', staff_id = ?, staff_name = ?
        WHERE id = ?
    ''', (data.get('staff_id'), data.get('staff_name'), order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '接单成功'}) if success else jsonify({'code': 1, 'message': '接单失败'})

@app.route('/api/housekeeping/orders/<int:order_id>/process', methods=['PUT'])
def process_housekeeping_order(order_id):
    """开始服务"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE housekeeping_orders SET status = ? WHERE id = ?', ('processing', order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '服务已开始'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/housekeeping/orders/<int:order_id>/complete', methods=['PUT'])
def complete_housekeeping_order(order_id):
    """完成服务"""
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE housekeeping_orders 
        SET status = 'pending_review', completed_at = ?
        WHERE id = ?
    ''', (now, order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '服务已完成，等待评价'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/housekeeping/orders/<int:order_id>/review', methods=['POST'])
def review_housekeeping_order(order_id):
    """评价订单"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE housekeeping_orders 
        SET status = 'completed', rating = ?, review = ?
        WHERE id = ?
    ''', (data.get('rating'), data.get('review', ''), order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '评价成功'}) if success else jsonify({'code': 1, 'message': '评价失败'})

@app.route('/api/housekeeping/staff', methods=['GET'])
def get_service_staff():
    """获取服务人员列表"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM service_staff ORDER BY id')
    staff = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': staff})

# ============ 食堂管理API ============

@app.route('/api/canteen/dishes', methods=['GET'])
def get_canteen_dishes():
    """获取菜品列表"""
    conn = get_db()
    cursor = conn.cursor()
    category = request.args.get('category', '')
    if category:
        cursor.execute('SELECT * FROM canteen_dishes WHERE category = ? ORDER BY today_sales DESC', (category,))
    else:
        cursor.execute('SELECT * FROM canteen_dishes ORDER BY today_sales DESC')
    dishes = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': dishes})

@app.route('/api/canteen/dishes', methods=['POST'])
def create_dish():
    """新增菜品"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO canteen_dishes (name, category, price, unit, nutrition_info)
        VALUES (?, ?, ?, ?, ?)
    ''', (data.get('name'), data.get('category'), data.get('price'), 
          data.get('unit', '份'), data.get('nutrition_info', '')))
    conn.commit()
    dish_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '菜品添加成功', 'data': {'id': dish_id}})

@app.route('/api/canteen/dishes/<int:dish_id>', methods=['PUT'])
def update_dish(dish_id):
    """编辑菜品"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE canteen_dishes 
        SET name = ?, category = ?, price = ?, unit = ?, nutrition_info = ?
        WHERE id = ?
    ''', (data.get('name'), data.get('category'), data.get('price'),
          data.get('unit'), data.get('nutrition_info'), dish_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '菜品更新成功'}) if success else jsonify({'code': 1, 'message': '菜品更新失败'})

@app.route('/api/canteen/dishes/<int:dish_id>', methods=['DELETE'])
def delete_dish(dish_id):
    """删除菜品"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM canteen_dishes WHERE id = ?', (dish_id,))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '菜品删除成功'}) if success else jsonify({'code': 1, 'message': '菜品删除失败'})

@app.route('/api/canteen/orders', methods=['GET'])
def get_canteen_orders():
    """获取订餐订单列表"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    if status:
        cursor.execute('''
            SELECT * FROM canteen_orders 
            WHERE status = ? 
            ORDER BY created_at DESC LIMIT 10
        ''', (status,))
    else:
        cursor.execute('SELECT * FROM canteen_orders ORDER BY created_at DESC LIMIT 10')
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': orders})

@app.route('/api/canteen/orders/all', methods=['GET'])
def get_all_canteen_orders():
    """获取所有订餐订单"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    if status:
        cursor.execute('''
            SELECT * FROM canteen_orders 
            WHERE status = ? 
            ORDER BY created_at DESC
        ''', (status,))
    else:
        cursor.execute('SELECT * FROM canteen_orders ORDER BY created_at DESC')
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': orders})

@app.route('/api/canteen/orders', methods=['POST'])
def create_canteen_order():
    """创建订餐订单"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM canteen_orders WHERE order_no LIKE ?", (f'DC{today}%',))
    count = cursor.fetchone()[0]
    order_no = f"DC{today}{count+1:02d}"
    cursor.execute('''
        INSERT INTO canteen_orders (order_no, customer_name, customer_phone, dishes, meal_type, amount, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
    ''', (order_no, data.get('customer_name'), data.get('customer_phone'),
          data.get('dishes'), data.get('meal_type'), data.get('amount')))
    conn.commit()
    order_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '订餐成功', 'data': {'id': order_id, 'order_no': order_no}})

@app.route('/api/canteen/orders/<int:order_id>/accept', methods=['PUT'])
def accept_canteen_order(order_id):
    """确认订餐"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE canteen_orders SET status = ? WHERE id = ?', ('confirmed', order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '订单已确认'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/canteen/orders/<int:order_id>/complete', methods=['PUT'])
def complete_canteen_order(order_id):
    """完成订餐"""
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE canteen_orders 
        SET status = 'completed', completed_at = ?
        WHERE id = ?
    ''', (now, order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '订单已完成'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/canteen/ingredients', methods=['GET'])
def get_ingredients():
    """获取食材库存"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ingredients ORDER BY status, stock')
    ingredients = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': ingredients})

@app.route('/api/canteen/menus', methods=['GET'])
def get_canteen_menus():
    """获取每日菜谱"""
    conn = get_db()
    cursor = conn.cursor()
    menu_date = request.args.get('date', '')
    meal_type = request.args.get('meal_type', '')
    query = 'SELECT * FROM canteen_menus WHERE 1=1'
    params = []
    if menu_date:
        query += ' AND menu_date = ?'
        params.append(menu_date)
    if meal_type:
        query += ' AND meal_type = ?'
        params.append(meal_type)
    query += ' ORDER BY menu_date DESC, meal_type'
    cursor.execute(query, params)
    menus = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': menus})

@app.route('/api/canteen/menus', methods=['POST'])
def create_canteen_menu():
    """添加每日菜谱"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO canteen_menus (menu_date, meal_type, dishes, price, calories, status)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data.get('menu_date'), data.get('meal_type'), data.get('dishes'),
          data.get('price', 0), data.get('calories', ''), data.get('status', 'available')))
    conn.commit()
    menu_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '菜谱添加成功', 'data': {'id': menu_id}})

@app.route('/api/canteen/menus/<int:menu_id>', methods=['PUT'])
def update_canteen_menu(menu_id):
    """更新每日菜谱"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE canteen_menus
        SET menu_date = ?, meal_type = ?, dishes = ?, price = ?, calories = ?, status = ?
        WHERE id = ?
    ''', (data.get('menu_date'), data.get('meal_type'), data.get('dishes'),
          data.get('price', 0), data.get('calories', ''), data.get('status', 'available'), menu_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '菜谱更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/canteen/menus/<int:menu_id>', methods=['DELETE'])
def delete_canteen_menu(menu_id):
    """删除每日菜谱"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM canteen_menus WHERE id = ?', (menu_id,))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '菜谱删除成功'}) if success else jsonify({'code': 1, 'message': '删除失败'})

@app.route('/api/canteen/gallery', methods=['GET'])
def get_canteen_gallery():
    """获取食堂风采列表"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM canteen_gallery ORDER BY sort ASC, id DESC')
    gallery = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': gallery})

@app.route('/api/canteen/gallery', methods=['POST'])
def create_canteen_gallery():
    """添加食堂风采"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO canteen_gallery (title, desc, icon, bg, sort, status)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data.get('title'), data.get('desc', ''), data.get('icon', '🍽️'),
          data.get('bg', '#FFF7E6'), data.get('sort', 10), data.get('status', 'active')))
    conn.commit()
    gallery_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '风采添加成功', 'data': {'id': gallery_id}})

@app.route('/api/canteen/gallery/<int:gallery_id>', methods=['PUT'])
def update_canteen_gallery(gallery_id):
    """更新食堂风采"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE canteen_gallery
        SET title = ?, desc = ?, icon = ?, bg = ?, sort = ?, status = ?
        WHERE id = ?
    ''', (data.get('title'), data.get('desc', ''), data.get('icon', '🍽️'),
          data.get('bg', '#FFF7E6'), data.get('sort', 10), data.get('status', 'active'), gallery_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '风采更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/canteen/gallery/<int:gallery_id>', methods=['DELETE'])
def delete_canteen_gallery(gallery_id):
    """删除食堂风采"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM canteen_gallery WHERE id = ?', (gallery_id,))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '风采删除成功'}) if success else jsonify({'code': 1, 'message': '删除失败'})

# ============ 物业缴费API ============

@app.route('/api/property/fees', methods=['GET'])
def get_property_fees():
    """获取物业缴费列表"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    fee_type = request.args.get('fee_type', '')
    
    query = 'SELECT * FROM property_fees WHERE 1=1'
    params = []
    if status:
        query += ' AND status = ?'
        params.append(status)
    if fee_type:
        query += ' AND fee_type = ?'
        params.append(fee_type)
    query += ' ORDER BY created_at DESC'
    
    cursor.execute(query, params)
    fees = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': fees})

@app.route('/api/property/fees', methods=['POST'])
def create_property_fee():
    """创建物业费账单"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM property_fees WHERE fee_no LIKE ?", (f'WY{today}%',))
    count = cursor.fetchone()[0]
    fee_no = f"WY{today}{count+1:02d}"
    
    due_date = datetime.now() + timedelta(days=15)
    
    cursor.execute('''
        INSERT INTO property_fees 
        (fee_no, resident_name, resident_phone, building, unit, room_no, fee_type, fee_period, amount, status, due_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'unpaid', ?)
    ''', (fee_no, data.get('resident_name'), data.get('resident_phone'),
          data.get('building'), data.get('unit'), data.get('room_no'),
          data.get('fee_type'), data.get('fee_period'), data.get('amount'),
          due_date.strftime('%Y-%m-%d')))
    
    conn.commit()
    fee_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '账单创建成功', 'data': {'id': fee_id}})

@app.route('/api/property/fees/<int:fee_id>', methods=['PUT'])
def update_property_fee(fee_id):
    """更新账单"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE property_fees 
        SET resident_name = ?, resident_phone = ?, building = ?, unit = ?, room_no = ?,
            fee_type = ?, fee_period = ?, amount = ?, due_date = ?
        WHERE id = ?
    ''', (data.get('resident_name'), data.get('resident_phone'), data.get('building'),
          data.get('unit'), data.get('room_no'), data.get('fee_type'), data.get('fee_period'),
          data.get('amount'), data.get('due_date'), fee_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '账单更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/property/fees/<int:fee_id>/pay', methods=['POST'])
def pay_property_fee(fee_id):
    """缴费"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE property_fees 
        SET status = 'paid', paid_date = ?, payment_method = ?, paid_amount = amount
        WHERE id = ?
    ''', (now, data.get('payment_method', '在线支付'), fee_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '缴费成功'}) if success else jsonify({'code': 1, 'message': '缴费失败'})

# ============ 报修管理API ============

@app.route('/api/repair/orders', methods=['GET'])
def get_repair_orders():
    """获取报修订单列表"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM repair_orders WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM repair_orders ORDER BY created_at DESC')
    
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': orders})

@app.route('/api/repair/orders', methods=['POST'])
def create_repair_order():
    """创建报修单"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM repair_orders WHERE order_no LIKE ?", (f'BX{today}%',))
    count = cursor.fetchone()[0]
    order_no = f"BX{today}{count+1:02d}"
    
    # 兼容前端字段名（前端传 contact_name/contact_phone/description/book_time）
    resident_name = data.get('contact_name') or data.get('resident_name', '未知')
    resident_phone = data.get('contact_phone') or data.get('resident_phone', '')
    building = data.get('building', '碧水园')
    unit = data.get('unit', '')
    room_no = data.get('room_no', '')
    repair_type = data.get('repair_type', '其他')
    repair_desc = data.get('description') or data.get('repair_desc', '')
    urgency = data.get('urgency', 'normal')
    appointment_time = data.get('book_time') or data.get('appointment_time', '')

    cursor.execute('''
        INSERT INTO repair_orders
        (order_no, resident_name, resident_phone, building, unit, room_no, repair_type, repair_desc, urgency, appointment_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (order_no, resident_name, resident_phone, building, unit, room_no,
          repair_type, repair_desc, urgency, appointment_time))
    
    conn.commit()
    order_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '报修提交成功', 'data': {'id': order_id}})

@app.route('/api/repair/orders/<int:order_id>/assign', methods=['PUT'])
def assign_repair_order(order_id):
    """派单"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE repair_orders 
        SET status = 'assigned', assignee_id = ?, assignee_name = ?, appointment_time = ?
        WHERE id = ?
    ''', (data.get('assignee_id'), data.get('assignee_name'), data.get('appointment_time'), order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '派单成功'}) if success else jsonify({'code': 1, 'message': '派单失败'})

@app.route('/api/repair/orders/<int:order_id>/process', methods=['PUT'])
def process_repair_order(order_id):
    """开始维修"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE repair_orders SET status = ? WHERE id = ?', ('processing', order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '维修已开始'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/repair/orders/<int:order_id>/complete', methods=['PUT'])
def complete_repair_order(order_id):
    """完成维修"""
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE repair_orders 
        SET status = 'completed', completed_at = ?
        WHERE id = ?
    ''', (now, order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '维修完成'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/repair/orders/<int:order_id>/review', methods=['POST'])
def review_repair_order(order_id):
    """评价"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE repair_orders 
        SET rating = ?, review = ?
        WHERE id = ?
    ''', (data.get('rating'), data.get('review', ''), order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '评价成功'}) if success else jsonify({'code': 1, 'message': '评价失败'})

# ============ 访客管理API ============

@app.route('/api/visitor/records', methods=['GET'])
def get_visitor_records():
    """获取访客记录"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM visitor_records WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM visitor_records ORDER BY created_at DESC')
    
    records = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': records})

@app.route('/api/visitor/records', methods=['POST'])
def create_visitor_record():
    """登记访客"""
    data = request.json or {}
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')

    # 兼容前端字段名（前端传 visit_time/plate_number）
    visitor_name = data.get('visitor_name', '未知访客')
    visitor_phone = data.get('visitor_phone', '')
    visited_building = data.get('visited_building') or data.get('building') or '未知楼栋'
    visited_unit = data.get('visited_unit') or data.get('unit') or ''
    visited_room = data.get('visited_room') or data.get('room') or ''
    visited_resident = data.get('visited_resident') or data.get('resident_name') or data.get('contact_name') or '未知住户'
    visit_purpose = data.get('visit_purpose') or data.get('purpose') or '访客邀请'
    entry_time = data.get('entry_time') or data.get('visit_time') or now
    plate_number = data.get('plate_number', '')
    remark = data.get('remark', '')
    if plate_number and not remark:
        remark = f'车牌号：{plate_number}'

    cursor.execute('''
        INSERT INTO visitor_records
        (visitor_name, visitor_phone, visited_building, visited_unit, visited_room, visited_resident, visit_purpose, entry_time, status, remark)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    ''', (visitor_name, visitor_phone, visited_building, visited_unit, visited_room,
          visited_resident, visit_purpose, entry_time, remark))

    conn.commit()
    record_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '访客登记成功', 'data': {'id': record_id}})

@app.route('/api/visitor/records/<int:record_id>/exit', methods=['PUT'])
def exit_visitor_record(record_id):
    """访客离开"""
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE visitor_records 
        SET status = 'outside', exit_time = ?
        WHERE id = ?
    ''', (now, record_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '访客已离开'}) if success else jsonify({'code': 1, 'message': '操作失败'})

@app.route('/api/visitor/records/<int:record_id>/confirm', methods=['PUT'])
def confirm_visitor_record(record_id):
    """物业确认访客进入"""
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE visitor_records 
        SET status = 'inside', entry_time = ?
        WHERE id = ? AND status = 'pending'
    ''', (now, record_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '已确认访客进入'}) if success else jsonify({'code': 1, 'message': '确认失败，记录不存在或已处理'})

# ============ 公告通知API ============

@app.route('/api/announcements', methods=['GET'])
def get_announcements():
    """获取公告列表"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM announcements ORDER BY is_top DESC, is_urgent DESC, published_at DESC')
    announcements = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': announcements})

@app.route('/api/announcements', methods=['POST'])
def create_announcement():
    """发布公告"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    
    cursor.execute('''
        INSERT INTO announcements 
        (title, content, category, is_top, is_urgent, publisher, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (data.get('title'), data.get('content'), data.get('category', 'normal'),
          data.get('is_top', 0), data.get('is_urgent', 0), data.get('publisher', '物业管理处'), now))
    
    conn.commit()
    ann_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '公告发布成功', 'data': {'id': ann_id}})

@app.route('/api/announcements/<int:ann_id>', methods=['PUT'])
def update_announcement(ann_id):
    """更新公告"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE announcements 
        SET title = ?, content = ?, category = ?, is_top = ?, is_urgent = ?
        WHERE id = ?
    ''', (data.get('title'), data.get('content'), data.get('category'),
          data.get('is_top', 0), data.get('is_urgent', 0), ann_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '公告更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/announcements/<int:ann_id>', methods=['DELETE'])
def delete_announcement(ann_id):
    """删除公告"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM announcements WHERE id = ?', (ann_id,))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '公告已删除'}) if success else jsonify({'code': 1, 'message': '删除失败'})

# ============ 车位管理API ============

@app.route('/api/parking/spaces', methods=['GET'])
def get_parking_spaces():
    """获取车位列表"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM parking_spaces WHERE status = ? ORDER BY space_no', (status,))
    else:
        cursor.execute('SELECT * FROM parking_spaces ORDER BY space_no')
    
    spaces = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': spaces})

@app.route('/api/parking/spaces', methods=['POST'])
def create_parking_space():
    """添加车位"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO parking_spaces 
        (space_no, area, space_type, monthly_fee, status)
        VALUES (?, ?, ?, ?, 'available')
    ''', (data.get('space_no'), data.get('area'), data.get('space_type', 'normal'), data.get('monthly_fee', 300)))
    
    conn.commit()
    space_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '车位添加成功', 'data': {'id': space_id}})

@app.route('/api/parking/spaces/<int:space_id>', methods=['PUT'])
def update_parking_space(space_id):
    """更新车位"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    card_start = data.get('card_start_date')
    card_end = data.get('card_end_date')
    
    cursor.execute('''
        UPDATE parking_spaces 
        SET resident_name = ?, resident_phone = ?, plate_no = ?, 
            card_start_date = ?, card_end_date = ?, status = ?
        WHERE id = ?
    ''', (data.get('resident_name'), data.get('resident_phone'), data.get('plate_no'),
          card_start, card_end, 'occupied' if data.get('resident_name') else 'available', space_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '车位更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/parking/records', methods=['GET'])
def get_parking_records():
    """获取停车记录"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM parking_records WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM parking_records ORDER BY created_at DESC')
    
    records = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': records})

# ============ 康养服务API ============

@app.route('/api/health/records', methods=['GET'])
def get_health_records():
    """获取健康记录"""
    conn = get_db()
    cursor = conn.cursor()
    record_type = request.args.get('record_type', '')
    
    if record_type:
        cursor.execute('SELECT * FROM health_records WHERE record_type = ? ORDER BY record_time DESC', (record_type,))
    else:
        cursor.execute('SELECT * FROM health_records ORDER BY record_time DESC')
    
    records = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': records})

@app.route('/api/health/records', methods=['POST'])
def create_health_record():
    """添加健康记录"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    
    cursor.execute('''
        INSERT INTO health_records 
        (resident_name, resident_phone, building, room_no, record_type, record_value, record_time, is_abnormal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (data.get('resident_name'), data.get('resident_phone'), data.get('building'),
          data.get('room_no'), data.get('record_type'), data.get('record_value'), now, data.get('is_abnormal', 0)))
    
    conn.commit()
    record_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '健康记录添加成功', 'data': {'id': record_id}})

@app.route('/api/care/plans', methods=['GET'])
def get_care_plans():
    """获取照护计划"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM care_plans WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM care_plans ORDER BY created_at DESC')
    
    plans = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': plans})

@app.route('/api/care/plans', methods=['POST'])
def create_care_plan():
    """创建照护计划"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM care_plans WHERE plan_no LIKE ?", (f'ZH{today}%',))
    count = cursor.fetchone()[0]
    plan_no = f"ZH{today}{count+1:02d}"
    
    cursor.execute('''
        INSERT INTO care_plans 
        (plan_no, resident_name, resident_phone, building, room_no, care_type, care_content, frequency, start_date, end_date, assignee_name, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
    ''', (plan_no, data.get('resident_name'), data.get('resident_phone'), data.get('building'),
          data.get('room_no'), data.get('care_type'), data.get('care_content'), data.get('frequency'),
          data.get('start_date'), data.get('end_date'), data.get('assignee_name')))
    
    conn.commit()
    plan_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '照护计划创建成功', 'data': {'id': plan_id}})

@app.route('/api/care/plans/<int:plan_id>', methods=['PUT'])
def update_care_plan(plan_id):
    """更新照护计划"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE care_plans 
        SET status = ?, care_content = ?, end_date = ?
        WHERE id = ?
    ''', (data.get('status', 'active'), data.get('care_content'), data.get('end_date'), plan_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '照护计划更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/sos/records', methods=['GET'])
def get_sos_records():
    """获取SOS记录"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM sos_records WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM sos_records ORDER BY created_at DESC')
    
    records = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': records})

@app.route('/api/sos/records', methods=['POST'])
def create_sos_record():
    """发起SOS呼叫"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM sos_records WHERE sos_no LIKE ?", (f'SOS{today}%',))
    count = cursor.fetchone()[0]
    sos_no = f"SOS{today}{count+1:02d}"
    
    cursor.execute('''
        INSERT INTO sos_records 
        (sos_no, resident_name, resident_phone, sos_location, sos_reason, urgency, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
    ''', (sos_no, data.get('resident_name'), data.get('resident_phone'),
          data.get('sos_location'), data.get('sos_reason'), data.get('urgency', 'high')))
    
    conn.commit()
    sos_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': 'SOS呼叫已发送', 'data': {'id': sos_id}})

# ============ SOS紧急呼叫API (别名) ============

@app.route('/api/sos/alert', methods=['POST'])
def sos_alert():
    """SOS紧急呼叫 - 简化版API，用于H5端快速触发"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM sos_records WHERE sos_no LIKE ?", (f'SOS{today}%',))
    count = cursor.fetchone()[0]
    sos_no = f"SOS{today}{count+1:02d}"
    
    cursor.execute('''
        INSERT INTO sos_records 
        (sos_no, resident_name, resident_phone, sos_location, sos_reason, urgency, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pending')
    ''', (sos_no, data.get('resident_name', '未知'), data.get('resident_phone', ''),
          data.get('location', data.get('sos_location', '未知位置')), 
          data.get('alert_type', data.get('sos_reason', '紧急求助')),
          data.get('urgency', 'high')))
    
    conn.commit()
    sos_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': 'SOS呼叫已发送', 'data': {'id': sos_id, 'sos_no': sos_no}})

@app.route('/api/sos/records/<int:sos_id>/handle', methods=['PUT'])
def handle_sos_record(sos_id):
    """处理SOS"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE sos_records 
        SET status = 'handled', handler_name = ?, handle_result = ?, handle_time = ?
        WHERE id = ?
    ''', (data.get('handler_name'), data.get('handle_result'), now, sos_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': 'SOS已处理'}) if success else jsonify({'code': 1, 'message': '处理失败'})

# ============ 社区活动API ============

@app.route('/api/activities', methods=['GET'])
def get_activities():
    """获取活动列表"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM activities ORDER BY start_time DESC')
    activities = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': activities})

@app.route('/api/activities', methods=['POST'])
def create_activity():
    """创建活动"""
    data = request.json
    today = datetime.now().strftime('%Y%m%d')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM activities WHERE activity_no LIKE ?", (f'HD{today}%',))
    count = cursor.fetchone()[0]
    activity_no = f"HD{today}{count+1:02d}"
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    
    cursor.execute('''
        INSERT INTO activities 
        (activity_no, title, content, activity_type, location, start_time, end_time, organizer, max_participants, fee, status, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)
    ''', (activity_no, data.get('title'), data.get('content'), data.get('activity_type'),
          data.get('location'), data.get('start_time'), data.get('end_time'),
          data.get('organizer'), data.get('max_participants', 50), data.get('fee', 0), now))
    
    conn.commit()
    activity_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '活动创建成功', 'data': {'id': activity_id}})

@app.route('/api/activities/<int:activity_id>/register', methods=['POST'])
def register_activity(activity_id):
    """报名活动"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    
    cursor.execute('SELECT max_participants, current_participants FROM activities WHERE id = ?', (activity_id,))
    activity = cursor.fetchone()
    
    if activity and activity['current_participants'] < activity['max_participants']:
        cursor.execute('''
            INSERT INTO activity_registrations 
            (activity_id, resident_name, resident_phone, participants, fee, status, registered_at)
            VALUES (?, ?, ?, ?, ?, 'registered', ?)
        ''', (activity_id, data.get('resident_name'), data.get('resident_phone'),
              data.get('participants', 1), data.get('fee', 0), now))
        
        cursor.execute('UPDATE activities SET current_participants = current_participants + ? WHERE id = ?',
                      (data.get('participants', 1), activity_id))
        
        conn.commit()
        reg_id = cursor.lastrowid
        conn.close()
        return jsonify({'code': 0, 'message': '报名成功'})
    
    conn.close()
    return jsonify({'code': 1, 'message': '报名已满'})

@app.route('/api/activities/<int:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    """更新活动"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE activities 
        SET title = ?, content = ?, activity_type = ?, location = ?, start_time = ?, end_time = ?, max_participants = ?, fee = ?
        WHERE id = ?
    ''', (data.get('title'), data.get('content'), data.get('activity_type'), data.get('location'),
          data.get('start_time'), data.get('end_time'), data.get('max_participants'), data.get('fee'), activity_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '活动更新成功'}) if success else jsonify({'code': 1, 'message': '更新失败'})

@app.route('/api/activities/<int:activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    """删除活动"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM activities WHERE id = ?', (activity_id,))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '活动已删除'}) if success else jsonify({'code': 1, 'message': '删除失败'})

# ============ 安防监控API ============

@app.route('/api/security/devices', methods=['GET'])
def get_access_devices():
    """获取门禁设备"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM access_control_devices ORDER BY device_no')
    devices = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': devices})

@app.route('/api/security/access-records', methods=['GET'])
def get_access_records():
    """获取通行记录"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM access_records ORDER BY access_time DESC LIMIT 50')
    records = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': records})

@app.route('/api/security/monitoring-points', methods=['GET'])
def get_monitoring_points():
    """获取监控点位"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM monitoring_points ORDER BY point_no')
    points = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': points})

@app.route('/api/security/alerts', methods=['GET'])
def get_alert_records():
    """获取告警记录"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    
    if status:
        cursor.execute('SELECT * FROM alert_records WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM alert_records ORDER BY created_at DESC')
    
    records = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': records})

@app.route('/api/security/alerts/<int:alert_id>/handle', methods=['PUT'])
def handle_alert(alert_id):
    """处理告警"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        UPDATE alert_records 
        SET status = 'handled', handler_name = ?, handle_result = ?, handle_time = ?
        WHERE id = ?
    ''', (data.get('handler_name'), data.get('handle_result'), now, alert_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '告警已处理'}) if success else jsonify({'code': 1, 'message': '处理失败'})

# ============ 统计API ============

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """获取统计数据"""
    conn = get_db()
    cursor = conn.cursor()
    
    # 家政服务统计
    cursor.execute('SELECT COUNT(*) FROM housekeeping_orders')
    total_orders = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM housekeeping_orders WHERE status = 'completed'")
    completed_orders = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM housekeeping_orders WHERE status IN ('pending', 'accepted', 'processing')")
    pending_orders = cursor.fetchone()[0]
    cursor.execute("SELECT AVG(rating) FROM housekeeping_orders WHERE rating IS NOT NULL")
    avg_rating_row = cursor.fetchone()[0]
    avg_rating = round(avg_rating_row, 1) if avg_rating_row else 0
    
    # 食堂统计
    cursor.execute('SELECT COUNT(*) FROM canteen_orders')
    total_canteen_orders = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM canteen_orders WHERE DATE(created_at) = DATE('now')")
    today_orders = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM canteen_dishes')
    total_dishes = cursor.fetchone()[0]
    cursor.execute('SELECT SUM(amount) FROM canteen_orders WHERE status = "completed"')
    revenue_row = cursor.fetchone()[0]
    revenue = revenue_row if revenue_row else 0
    cursor.execute("SELECT COUNT(*) FROM canteen_orders WHERE status = 'completed'")
    completed_canteen = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM canteen_orders")
    total_canteen = cursor.fetchone()[0]
    good_rate = round((completed_canteen / total_canteen * 100), 1) if total_canteen > 0 else 0
    
    # 物业缴费统计
    cursor.execute("SELECT COUNT(*) FROM property_fees WHERE status = 'unpaid'")
    unpaid_fees = cursor.fetchone()[0]
    cursor.execute("SELECT SUM(amount) FROM property_fees WHERE status = 'paid'")
    paid_amount_row = cursor.fetchone()[0]
    paid_amount = paid_amount_row if paid_amount_row else 0
    
    # 报修统计
    cursor.execute("SELECT COUNT(*) FROM repair_orders WHERE status IN ('pending', 'assigned', 'processing')")
    pending_repairs = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM repair_orders")
    total_repairs = cursor.fetchone()[0]
    
    # 访客统计
    cursor.execute("SELECT COUNT(*) FROM visitor_records WHERE status = 'inside'")
    inside_visitors = cursor.fetchone()[0]
    
    # 公告统计
    cursor.execute('SELECT COUNT(*) FROM announcements')
    total_announcements = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM announcements WHERE is_urgent = 1")
    urgent_announcements = cursor.fetchone()[0]
    
    # 车位统计
    cursor.execute("SELECT COUNT(*) FROM parking_spaces")
    total_spaces = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM parking_spaces WHERE status = 'occupied'")
    occupied_spaces = cursor.fetchone()[0]
    
    # 康养统计
    cursor.execute("SELECT COUNT(*) FROM health_records WHERE is_abnormal = 1")
    abnormal_health = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM sos_records WHERE status = 'pending'")
    pending_sos = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM care_plans WHERE status = 'active'")
    active_care = cursor.fetchone()[0]
    
    # 活动统计
    cursor.execute('SELECT COUNT(*) FROM activities')
    total_activities = cursor.fetchone()[0]
    
    # 安防统计
    cursor.execute("SELECT COUNT(*) FROM access_control_devices WHERE status = 'online'")
    online_devices = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM alert_records WHERE status = 'pending'")
    pending_alerts = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'code': 0,
        'data': {
            'housekeeping': {
                'total_orders': total_orders,
                'completed_orders': completed_orders,
                'pending_orders': pending_orders,
                'avg_rating': avg_rating
            },
            'canteen': {
                'today_orders': today_orders,
                'total_orders': total_canteen_orders,
                'total_dishes': total_dishes,
                'revenue': revenue,
                'good_rate': good_rate
            },
            'property': {
                'unpaid_fees': unpaid_fees,
                'paid_amount': paid_amount
            },
            'repair': {
                'pending_repairs': pending_repairs,
                'total_repairs': total_repairs
            },
            'visitor': {
                'inside_visitors': inside_visitors
            },
            'announcement': {
                'total': total_announcements,
                'urgent': urgent_announcements
            },
            'parking': {
                'total_spaces': total_spaces,
                'occupied_spaces': occupied_spaces
            },
            'health': {
                'abnormal_health': abnormal_health,
                'pending_sos': pending_sos,
                'active_care': active_care
            },
            'activity': {
                'total': total_activities
            },
            'security': {
                'online_devices': online_devices,
                'pending_alerts': pending_alerts
            }
        }
    })

# ============ 统计快照API（用于轮询检测新事件） ============

@app.route('/api/stats/snapshot', methods=['GET'])
def get_stats_snapshot():
    """获取统计快照 - 用于PC端轮询检测新事件"""
    conn = get_db()
    cursor = conn.cursor()
    
    # 待处理订单数量
    cursor.execute("SELECT COUNT(*) FROM housekeeping_orders WHERE status IN ('pending', 'accepted', 'processing')")
    pending_orders = cursor.fetchone()[0]
    
    # 待处理报修数量
    cursor.execute("SELECT COUNT(*) FROM repair_orders WHERE status IN ('pending', 'assigned', 'processing')")
    pending_repairs = cursor.fetchone()[0]
    
    # 待处理SOS数量
    cursor.execute("SELECT COUNT(*) FROM sos_records WHERE status = 'pending'")
    pending_sos = cursor.fetchone()[0]
    
    # 未读消息数量（简化版：使用最近24小时的新记录）
    cursor.execute("SELECT COUNT(*) FROM announcements WHERE DATE(created_at) = DATE('now')")
    unread_messages = cursor.fetchone()[0]
    
    # 待处理食堂订单
    cursor.execute("SELECT COUNT(*) FROM canteen_orders WHERE status = 'pending'")
    pending_canteen = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'code': 0,
        'data': {
            'pending_orders': pending_orders,
            'pending_repairs': pending_repairs,
            'pending_sos': pending_sos,
            'pending_canteen': pending_canteen,
            'unread_messages': unread_messages,
            'timestamp': datetime.now().isoformat()
        }
    })
    
# ============ 社区医生管理模块 API ============

@app.route('/api/community/doctors', methods=['GET'])
def get_community_doctors():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM community_doctors ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    result = []
    for row in rows:
        d = dict(row)
        result.append(d)
    return jsonify({'code': 0, 'data': result})

@app.route('/api/community/doctors/<int:doctor_id>', methods=['GET'])
def get_community_doctor(doctor_id):
    """获取单个医生信息"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM community_doctors WHERE id = ?', (doctor_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return jsonify({'code': 0, 'data': dict(row)})
    return jsonify({'code': 1, 'message': '医生不存在'})

@app.route('/api/community/doctors', methods=['POST'])
def create_community_doctor():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO community_doctors (name, title, dept, hospital, phone, work_time, specialties, bio, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
    ''', (data.get('name'), data.get('title'), data.get('dept'), data.get('hospital'),
         data.get('phone'), data.get('work_time'), data.get('specialties'), data.get('bio')))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '添加成功'})

@app.route('/api/community/doctors/<int:doctor_id>', methods=['PUT'])
def update_community_doctor(doctor_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE community_doctors SET name=?, title=?, dept=?, hospital=?, phone=?, work_time=?, specialties=?, bio=?
        WHERE id=?
    ''', (data.get('name'), data.get('title'), data.get('dept'), data.get('hospital'),
         data.get('phone'), data.get('work_time'), data.get('specialties'), data.get('bio'), doctor_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '更新成功'})

@app.route('/api/community/doctors/<int:doctor_id>', methods=['DELETE'])
def delete_community_doctor(doctor_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM community_doctors WHERE id=?', (doctor_id,))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '删除成功'})



@app.route('/api/community/doctors/appointments', methods=['POST'])
def create_doctor_appointment():
    """居民预约医生"""
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO doctor_appointments
        (doctor_id, doctor_name, resident_name, resident_phone,
         appointment_date, appointment_time, symptom, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('doctor_id'),
        data.get('doctor_name', ''),
        data.get('resident_name', ''),
        data.get('resident_phone', ''),
        data.get('appointment_date', ''),
        data.get('appointment_time', ''),
        data.get('symptom', ''),
        'pending'
    ))
    conn.commit()
    apt_id = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '预约成功', 'data': {'id': apt_id}})

@app.route('/api/community/doctors/appointments', methods=['GET'])
def get_doctor_appointments():
    """获取医生预约列表"""
    conn = get_db()
    cursor = conn.cursor()
    doctor_id = request.args.get('doctor_id', '')
    if doctor_id:
        cursor.execute('SELECT * FROM doctor_appointments WHERE doctor_id=? ORDER BY created_at DESC', (doctor_id,))
    else:
        cursor.execute('SELECT * FROM doctor_appointments ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'code': 0, 'data': [dict(r) for r in rows]})
@app.route('/api/community/signings', methods=['GET'])
def get_community_signings():
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    if status:
        cursor.execute('SELECT * FROM community_signings WHERE status=? ORDER BY id DESC', (status,))
    else:
        cursor.execute('SELECT * FROM community_signings ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    result = [dict(row) for row in rows]
    return jsonify({'code': 0, 'data': result})

@app.route('/api/community/signings', methods=['POST'])
def create_community_signing():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO community_signings (resident_name, resident_phone, doctor_id, doctor_name, signing_date, valid_from, valid_until, service_package, status, remark)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)
    ''', (data.get('resident_name'), data.get('resident_phone'), data.get('doctor_id'),
         data.get('doctor_name'), data.get('signing_date', datetime.now().strftime('%Y-%m-%d')),
         data.get('valid_from'), data.get('valid_until'), data.get('service_package'), data.get('remark')))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '签约成功'})

@app.route('/api/community/signings/<int:signing_id>', methods=['PUT'])
def update_community_signing(signing_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE community_signings SET status=? WHERE id=?
    ''', (data.get('status', 'cancelled'), signing_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '更新成功'})

@app.route('/api/community/followups', methods=['GET'])
def get_community_followups():
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    if status:
        cursor.execute('SELECT * FROM community_followups WHERE status=? ORDER BY id DESC', (status,))
    else:
        cursor.execute('SELECT * FROM community_followups ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    result = [dict(row) for row in rows]
    return jsonify({'code': 0, 'data': result})

@app.route('/api/community/alerts', methods=['GET'])
def get_community_alerts():
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    if status:
        cursor.execute('SELECT * FROM community_alerts WHERE status=? ORDER BY id DESC', (status,))
    else:
        cursor.execute('SELECT * FROM community_alerts ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    result = [dict(row) for row in rows]
    return jsonify({'code': 0, 'data': result})

@app.route('/api/community/alerts/<int:alert_id>/handle', methods=['PUT'])
def handle_community_alert(alert_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE community_alerts SET status='handled', handled_by=?, handled_note=?, handled_at=?
        WHERE id=?
    ''', (data.get('handled_by'), data.get('handled_note'), datetime.now().strftime('%Y-%m-%d %H:%M:%S'), alert_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '处理成功'})

@app.route('/api/community/consultations', methods=['GET'])
def get_community_consultations():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM community_consultations ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    result = [dict(row) for row in rows]
    return jsonify({'code': 0, 'data': result})

@app.route('/api/community/consultations/<int:consult_id>/reply', methods=['PUT'])
def reply_community_consultation(consult_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE community_consultations SET doctor_reply=?, status='replied' WHERE id=?
    ''', (data.get('doctor_reply'), consult_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '回复成功'})




# ============ 居民端：家庭成员 API ============

@app.route('/api/family-members', methods=['GET'])
def get_family_members():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM family_members ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'code': 0, 'data': [dict(row) for row in rows]})

@app.route('/api/family-members', methods=['POST'])
def create_family_member():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO family_members
        (resident_name, relation, gender, birth_date, phone, id_card, health_status, remark)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
        (data.get('resident_name', ''), data.get('relation', ''),
         data.get('gender', ''), data.get('birth_date', ''),
         data.get('phone', ''), data.get('id_card', ''),
         data.get('health_status', ''), data.get('remark', '')))
    conn.commit()
    mid = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '添加成功', 'data': {'id': mid}})

@app.route('/api/family-members/<int:member_id>', methods=['PUT'])
def update_family_member(member_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''UPDATE family_members SET
        resident_name=?, relation=?, gender=?, birth_date=?, phone=?,
        id_card=?, health_status=?, remark=?
        WHERE id=?''',
        (data.get('resident_name', ''), data.get('relation', ''),
         data.get('gender', ''), data.get('birth_date', ''),
         data.get('phone', ''), data.get('id_card', ''),
         data.get('health_status', ''), data.get('remark', ''),
         member_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '修改成功'})

@app.route('/api/family-members/<int:member_id>', methods=['DELETE'])
def delete_family_member(member_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM family_members WHERE id=?', (member_id,))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '删除成功'})

# ============ 居民端：收货地址 API ============

@app.route('/api/shipping-addresses', methods=['GET'])
def get_shipping_addresses():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM shipping_addresses ORDER BY is_default DESC, id DESC')
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'code': 0, 'data': [dict(row) for row in rows]})

@app.route('/api/shipping-addresses', methods=['POST'])
def create_shipping_address():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    if data.get('is_default') == 1:
        cursor.execute('UPDATE shipping_addresses SET is_default=0')
    cursor.execute('''INSERT INTO shipping_addresses
        (contact_name, contact_phone, province, city, district, detail_address, is_default)
        VALUES (?, ?, ?, ?, ?, ?, ?)''',
        (data.get('contact_name', ''), data.get('contact_phone', ''),
         data.get('province', ''), data.get('city', ''),
         data.get('district', ''), data.get('detail_address', ''),
         data.get('is_default', 0)))
    aid = cursor.lastrowid
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '添加成功', 'data': {'id': aid}})

@app.route('/api/shipping-addresses/<int:addr_id>', methods=['PUT'])
def update_shipping_address(addr_id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    if data.get('is_default') == 1:
        cursor.execute('UPDATE shipping_addresses SET is_default=0')
    cursor.execute('''UPDATE shipping_addresses SET
        contact_name=?, contact_phone=?, province=?, city=?, district=?,
        detail_address=?, is_default=?
        WHERE id=?''',
        (data.get('contact_name', ''), data.get('contact_phone', ''),
         data.get('province', ''), data.get('city', ''),
         data.get('district', ''), data.get('detail_address', ''),
         data.get('is_default', 0), addr_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '修改成功'})

@app.route('/api/shipping-addresses/<int:addr_id>/set-default', methods=['PUT'])
def set_default_address(addr_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE shipping_addresses SET is_default=0')
    cursor.execute('UPDATE shipping_addresses SET is_default=1 WHERE id=?', (addr_id,))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '已设为默认'})

@app.route('/api/shipping-addresses/<int:addr_id>', methods=['DELETE'])
def delete_shipping_address(addr_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM shipping_addresses WHERE id=?', (addr_id,))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '删除成功'})

# ============ 居民端：健康档案 API ============

@app.route('/api/health-profile', methods=['GET'])
def get_health_profiles():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM health_profile ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    return jsonify({'code': 0, 'data': [dict(row) for row in rows]})

@app.route('/api/health-profile', methods=['POST'])
def create_health_profile():
    data = request.get_json()
    height = data.get('height', 0)
    weight = data.get('weight', 0)
    bmi = round(weight / ((height/100)**2), 1) if height and weight else 0
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO health_profile
        (resident_name, gender, birth_date, height, weight, bmi,
         blood_type, allergies, chronic_diseases, medications,
         last_exam_date, exam_summary, remark)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
        (data.get('resident_name', ''), data.get('gender', ''),
         data.get('birth_date', ''), height, weight, bmi,
         data.get('blood_type', ''), data.get('allergies', ''),
         data.get('chronic_diseases', ''), data.get('medications', ''),
         data.get('last_exam_date', ''), data.get('exam_summary', ''),
         data.get('remark', '')))
    pid = cursor.lastrowid
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '保存成功', 'data': {'id': pid}})

@app.route('/api/health-profile/<int:profile_id>', methods=['PUT'])
def update_health_profile(profile_id):
    data = request.get_json()
    height = data.get('height', 0)
    weight = data.get('weight', 0)
    bmi = round(weight / ((height/100)**2), 1) if height and weight else 0
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''UPDATE health_profile SET
        resident_name=?, gender=?, birth_date=?, height=?, weight=?, bmi=?,
        blood_type=?, allergies=?, chronic_diseases=?, medications=?,
        last_exam_date=?, exam_summary=?, remark=?
        WHERE id=?''',
        (data.get('resident_name', ''), data.get('gender', ''),
         data.get('birth_date', ''), height, weight, bmi,
         data.get('blood_type', ''), data.get('allergies', ''),
         data.get('chronic_diseases', ''), data.get('medications', ''),
         data.get('last_exam_date', ''), data.get('exam_summary', ''),
         data.get('remark', ''), profile_id))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '修改成功'})

@app.route('/api/health-profile/<int:profile_id>', methods=['DELETE'])
def delete_health_profile(profile_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM health_profile WHERE id=?', (profile_id,))
    conn.commit()
    conn.close()
    return jsonify({'code': 0, 'message': '删除成功'})

# ============ 居民端：我的订单 API（合并报修+康养） ============

@app.route('/api/my-orders', methods=['GET'])
def get_my_orders():
    conn = get_db()
    cursor = conn.cursor()
    result = []
    cursor.execute('SELECT id, order_no, repair_type as service_type, repair_desc as service_desc, status, created_at, appointment_time as book_time FROM repair_orders')
    for row in cursor.fetchall():
        d = dict(row)
        d['order_type'] = 'repair'
        result.append(d)
    cursor.execute('SELECT id, order_no, service_type, service_type_name as service_desc, status, created_at, book_time FROM health_orders')
    for row in cursor.fetchall():
        d = dict(row)
        d['order_type'] = 'health'
        result.append(d)
    result.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    conn.close()
    return jsonify({'code': 0, 'data': result})

# 此文件内容将被插入到 app.py 的 if __name__ == '__main__': 之前

# ===== 健康服务订单 API =====

@app.route('/api/health/orders', methods=['GET'])
def get_health_orders():
    """获取健康服务订单列表"""
    conn = get_db()
    cursor = conn.cursor()
    status = request.args.get('status', '')
    if status:
        cursor.execute('SELECT * FROM health_orders WHERE status = ? ORDER BY created_at DESC', (status,))
    else:
        cursor.execute('SELECT * FROM health_orders ORDER BY created_at DESC')
    orders = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify({'code': 0, 'data': orders})


@app.route('/api/health/orders', methods=['POST'])
def create_health_order():
    """创建健康服务订单"""
    data = request.json
    today = datetime.now()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM health_orders WHERE order_no LIKE ?", (f"JK{today.strftime('%Y%m%d')}%",))
    cnt = cursor.fetchone()[0]
    order_no = f"JK{today.strftime('%Y%m%d')}{cnt+1:02d}"
    service_names = {'体检': '常规体检', '按摩': '穴位按摩', '理疗': '物理治疗', '健康咨询': '营养师咨询'}
    cursor.execute('''
        INSERT INTO health_orders
            (order_no, service_type, service_type_name, book_date, book_time,
             contact_name, contact_phone, address, remark, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        order_no,
        data.get('service_type', ''),
        service_names.get(data.get('service_type', ''), '健康服务'),
        data.get('book_date', ''),
        data.get('book_time', ''),
        data.get('contact_name', ''),
        data.get('contact_phone', ''),
        data.get('address', ''),
        data.get('remark', ''),
        'pending'
    ))
    conn.commit()
    oid = cursor.lastrowid
    conn.close()
    return jsonify({'code': 0, 'message': '预约成功', 'data': {'id': oid}})


@app.route('/api/health/orders/<int:order_id>/accept', methods=['PUT'])
def accept_health_order(order_id):
    """接单"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE health_orders SET status=?, staff_id=?, staff_name=? WHERE id=?',
                   ('accepted', data.get('staff_id'), data.get('staff_name'), order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '接单成功'}) if success else jsonify({'code': 1, 'message': '接单失败'})


@app.route('/api/health/orders/<int:order_id>/process', methods=['PUT'])
def process_health_order(order_id):
    """开始服务"""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE health_orders SET status='processing' WHERE id=?", (order_id,))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '服务已开始'}) if success else jsonify({'code': 1, 'message': '操作失败'})


@app.route('/api/health/orders/<int:order_id>/complete', methods=['PUT'])
def complete_health_order(order_id):
    """完成服务"""
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE health_orders SET status='pending_review', completed_at=? WHERE id=?", (now, order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '服务已完成，等待评价'}) if success else jsonify({'code': 1, 'message': '操作失败'})


@app.route('/api/health/orders/<int:order_id>/review', methods=['POST'])
def review_health_order(order_id):
    """评价订单"""
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('UPDATE health_orders SET status=?, rating=?, review=? WHERE id=?',
                   ('completed', data.get('rating'), data.get('review', ''), order_id))
    conn.commit()
    success = cursor.rowcount > 0
    conn.close()
    return jsonify({'code': 0, 'message': '评价成功'}) if success else jsonify({'code': 1, 'message': '评价失败'})


if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 8889))
    print('=' * 50)
    print('初始化数据库...')
    init_db()
    print('数据库初始化完成！')
    print('=' * 50)
    print(f'启动智慧社区物业管理平台... (端口: {port})')
    print('=' * 50)
    app.run(host='0.0.0.0', port=port, debug=False, use_reloader=False)

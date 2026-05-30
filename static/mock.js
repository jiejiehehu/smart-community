/**
 * 智慧社区 API Mock 引擎
 * 拦截 fetch 请求，用 localStorage 模拟完整后端 API
 * 自动生成于部署时
 */

(function() {
    'use strict';

    const MOCK_DATA = {"housekeeping_orders": [{"id": 1, "order_no": "JZ2026052901", "service_type": "cooking", "service_type_name": "做饭钟点工", "book_date": "2026-05-26", "book_time": "10:00 - 13:00", "contact_name": "李明华", "contact_phone": "138****6789", "address": "碧水园3栋2单元1501", "area": "50-80㎡", "remark": null, "amount": 100.0, "status": "pending", "staff_id": null, "staff_name": null, "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 2, "order_no": "JZ2026052902", "service_type": "repair", "service_type_name": "家电维修", "book_date": "2026-05-29", "book_time": "13:00 - 13:00", "contact_name": "王建国", "contact_phone": "139****2234", "address": "翠湖居5栋1单元802", "area": "80-120㎡", "remark": null, "amount": 200.0, "status": "accepted", "staff_id": 2, "staff_name": "李师傅", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 3, "order_no": "JZ2026052903", "service_type": "repair", "service_type_name": "家电维修", "book_date": "2026-05-27", "book_time": "11:00 - 18:00", "contact_name": "张秀英", "contact_phone": "136****8876", "address": "怡景苑7栋3单元1102", "area": "50㎡以下", "remark": null, "amount": 200.0, "status": "processing", "staff_id": 6, "staff_name": "周师傅", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 4, "order_no": "JZ2026052904", "service_type": "repair", "service_type_name": "家电维修", "book_date": "2026-05-24", "book_time": "13:00 - 12:00", "contact_name": "陈桂兰", "contact_phone": "135****4532", "address": "幸福里2栋1单元501", "area": "120-150㎡", "remark": null, "amount": 200.0, "status": "pending_review", "staff_id": 5, "staff_name": "刘师傅", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": 5, "review": "非常专业，推荐！"}, {"id": 5, "order_no": "JZ2026052905", "service_type": "cooking", "service_type_name": "做饭钟点工", "book_date": "2026-05-31", "book_time": "11:00 - 16:00", "contact_name": "刘德华", "contact_phone": "137****9988", "address": "阳光城4栋2单元601", "area": "80-120㎡", "remark": null, "amount": 100.0, "status": "completed", "staff_id": 2, "staff_name": "李师傅", "created_at": "2026-05-29 06:03:34", "completed_at": "2026-05-27 14:03", "rating": 4, "review": "非常满意！"}, {"id": 6, "order_no": "JZ2026052906", "service_type": "repair", "service_type_name": "家电维修", "book_date": "2026-05-27", "book_time": "10:00 - 12:00", "contact_name": "周润发", "contact_phone": "158****7766", "address": "绿景花园1栋3单元901", "area": "50-80㎡", "remark": null, "amount": 200.0, "status": "pending", "staff_id": null, "staff_name": null, "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 7, "order_no": "JZ2026052907", "service_type": "move", "service_type_name": "搬家服务", "book_date": "2026-05-28", "book_time": "14:00 - 14:00", "contact_name": "吴亦凡", "contact_phone": "159****6655", "address": "御景湾6栋1单元1201", "area": "150㎡以上", "remark": null, "amount": 300.0, "status": "accepted", "staff_id": 3, "staff_name": "王阿姨", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 8, "order_no": "JZ2026052908", "service_type": "cleaning", "service_type_name": "日常保洁", "book_date": "2026-05-28", "book_time": "8:00 - 10:00", "contact_name": "成龙", "contact_phone": "186****5544", "address": "碧桂园8栋2单元1801", "area": "80-120㎡", "remark": null, "amount": 160.0, "status": "processing", "staff_id": 6, "staff_name": "周师傅", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 9, "order_no": "JZ2026052909", "service_type": "cleaning", "service_type_name": "日常保洁", "book_date": "2026-05-28", "book_time": "11:00 - 18:00", "contact_name": "李连杰", "contact_phone": "187****3322", "address": "金地花园3栋4单元601", "area": "50-80㎡", "remark": null, "amount": 160.0, "status": "pending_review", "staff_id": 5, "staff_name": "刘师傅", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": 5, "review": "态度好，效率高"}, {"id": 10, "order_no": "JZ2026052910", "service_type": "pet", "service_type_name": "宠物照顾", "book_date": "2026-05-26", "book_time": "15:00 - 16:00", "contact_name": "甄子丹", "contact_phone": "188****1100", "address": "万科城5栋1单元801", "area": "120-150㎡", "remark": null, "amount": 60.0, "status": "completed", "staff_id": 1, "staff_name": "张小燕", "created_at": "2026-05-29 06:03:34", "completed_at": "2026-05-26 14:03", "rating": 5, "review": "服务一流"}, {"id": 11, "order_no": "JZ2026052911", "service_type": "eldercare", "service_type_name": "养老陪护", "book_date": "2026-05-25", "book_time": "8:00 - 10:00", "contact_name": "赵丽颖", "contact_phone": "189****2277", "address": "保利公园9栋3单元1001", "area": "80-120㎡", "remark": null, "amount": 300.0, "status": "pending", "staff_id": null, "staff_name": null, "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 12, "order_no": "JZ2026052912", "service_type": "eldercare", "service_type_name": "养老陪护", "book_date": "2026-05-31", "book_time": "9:00 - 14:00", "contact_name": "杨幂", "contact_phone": "158****3388", "address": "华润城7栋2单元1502", "area": "50-80㎡", "remark": null, "amount": 300.0, "status": "accepted", "staff_id": 3, "staff_name": "王阿姨", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 13, "order_no": "JZ2026052913", "service_type": "cooking", "service_type_name": "做饭钟点工", "book_date": "2026-05-30", "book_time": "13:00 - 13:00", "contact_name": "迪丽热巴", "contact_phone": "159****4499", "address": "龙湖天街2栋1单元601", "area": "50㎡以下", "remark": null, "amount": 100.0, "status": "processing", "staff_id": 6, "staff_name": "周师傅", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": null, "review": null}, {"id": 14, "order_no": "JZ2026052914", "service_type": "wash", "service_type_name": "清洗服务", "book_date": "2026-05-27", "book_time": "13:00 - 16:00", "contact_name": "Angelababy", "contact_phone": "186****5566", "address": "中海国际4栋5单元1101", "area": "120-150㎡", "remark": null, "amount": 120.0, "status": "pending_review", "staff_id": 1, "staff_name": "张小燕", "created_at": "2026-05-29 06:03:34", "completed_at": null, "rating": 5, "review": "服务很好，很满意！"}, {"id": 15, "order_no": "JZ2026052915", "service_type": "cleaning", "service_type_name": "日常保洁", "book_date": "2026-05-25", "book_time": "15:00 - 14:00", "contact_name": "范冰冰", "contact_phone": "187****7788", "address": "绿地中心1栋3单元901", "area": "80-120㎡", "remark": null, "amount": 160.0, "status": "completed", "staff_id": 2, "staff_name": "李师傅", "created_at": "2026-05-29 06:03:34", "completed_at": "2026-05-27 14:03", "rating": 5, "review": "服务一流"}, {"id": 16, "order_no": "JZ2026052916", "service_type": "cleaning", "service_type_name": "日常保洁", "book_date": "2026-05-30", "book_time": "09:00-11:00", "contact_name": "张明华", "contact_phone": "138****5678", "address": "东湖社区3栋2单元501", "area": "50-80㎡", "remark": "", "amount": 160.0, "status": "completed", "staff_id": 5, "staff_name": "刘师傅", "created_at": "2026-05-29 06:06:21", "completed_at": "2026-05-29 14:07", "rating": 5, "review": ""}], "sqlite_sequence": [{"name": "service_staff", "seq": 6}, {"name": "housekeeping_orders", "seq": 16}, {"name": "canteen_dishes", "seq": 20}, {"name": "canteen_orders", "seq": 15}, {"name": "ingredients", "seq": 12}, {"name": "property_fees", "seq": 20}, {"name": "repair_orders", "seq": 15}, {"name": "visitor_records", "seq": 15}, {"name": "announcements", "seq": 12}, {"name": "parking_spaces", "seq": 25}, {"name": "parking_records", "seq": 12}, {"name": "health_records", "seq": 20}, {"name": "care_plans", "seq": 12}, {"name": "sos_records", "seq": 12}, {"name": "activities", "seq": 12}, {"name": "activity_registrations", "seq": 15}, {"name": "access_control_devices", "seq": 10}, {"name": "access_records", "seq": 30}, {"name": "monitoring_points", "seq": 12}, {"name": "alert_records", "seq": 15}], "service_staff": [{"id": 1, "name": "张小燕", "service_type": "日常保洁", "phone": "158****3210", "experience": "5年经验", "rating": 4.9, "status": "available", "avatar_color": "green"}, {"id": 2, "name": "李师傅", "service_type": "家电维修", "phone": "159****4321", "experience": "8年经验", "rating": 4.8, "status": "available", "avatar_color": "blue"}, {"id": 3, "name": "王阿姨", "service_type": "月嫂服务", "phone": "136****5432", "experience": "持证上岗", "rating": 5.0, "status": "available", "avatar_color": "orange"}, {"id": 4, "name": "陈大姐", "service_type": "养老陪护", "phone": "137****6543", "experience": "专业护理", "rating": 4.7, "status": "available", "avatar_color": "purple"}, {"id": 5, "name": "刘师傅", "service_type": "搬家服务", "phone": "138****7654", "experience": "10年经验", "rating": 4.9, "status": "available", "avatar_color": "green"}, {"id": 6, "name": "周师傅", "service_type": "清洗服务", "phone": "139****8765", "experience": "6年经验", "rating": 4.6, "status": "available", "avatar_color": "blue"}], "canteen_dishes": [{"id": 1, "name": "红烧肉", "category": "荤菜", "price": 28.0, "unit": "份", "nutrition_info": "热量: 485kcal", "today_sales": 86, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "name": "清蒸鲈鱼", "category": "荤菜", "price": 35.0, "unit": "份", "nutrition_info": "热量: 156kcal", "today_sales": 72, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "name": "糖醋排骨", "category": "荤菜", "price": 38.0, "unit": "份", "nutrition_info": "热量: 320kcal", "today_sales": 65, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "name": "宫保鸡丁", "category": "荤菜", "price": 25.0, "unit": "份", "nutrition_info": "热量: 210kcal", "today_sales": 58, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "name": "水煮牛肉", "category": "荤菜", "price": 42.0, "unit": "份", "nutrition_info": "热量: 280kcal", "today_sales": 52, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "name": "鱼香肉丝", "category": "荤菜", "price": 22.0, "unit": "份", "nutrition_info": "热量: 180kcal", "today_sales": 55, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "name": "麻婆豆腐", "category": "素菜", "price": 15.0, "unit": "份", "nutrition_info": "热量: 120kcal", "today_sales": 45, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "name": "番茄炒蛋", "category": "素菜", "price": 12.0, "unit": "份", "nutrition_info": "热量: 95kcal", "today_sales": 68, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "name": "酸辣土豆丝", "category": "素菜", "price": 10.0, "unit": "份", "nutrition_info": "热量: 80kcal", "today_sales": 52, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "name": "清炒时蔬", "category": "素菜", "price": 8.0, "unit": "份", "nutrition_info": "热量: 45kcal", "today_sales": 42, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "name": "凉拌黄瓜", "category": "凉菜", "price": 8.0, "unit": "份", "nutrition_info": "热量: 30kcal", "today_sales": 38, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "name": "凉拌木耳", "category": "凉菜", "price": 10.0, "unit": "份", "nutrition_info": "热量: 35kcal", "today_sales": 32, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "name": "紫菜蛋花汤", "category": "汤类", "price": 5.0, "unit": "份", "nutrition_info": "热量: 25kcal", "today_sales": 75, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "name": "西红柿鸡蛋汤", "category": "汤类", "price": 5.0, "unit": "份", "nutrition_info": "热量: 30kcal", "today_sales": 68, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "name": "玉米排骨汤", "category": "汤类", "price": 15.0, "unit": "份", "nutrition_info": "热量: 85kcal", "today_sales": 35, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 16, "name": "米饭", "category": "主食", "price": 2.0, "unit": "碗", "nutrition_info": "热量: 116kcal", "today_sales": 120, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 17, "name": "馒头", "category": "主食", "price": 1.0, "unit": "个", "nutrition_info": "热量: 110kcal", "today_sales": 45, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 18, "name": "面条", "category": "主食", "price": 8.0, "unit": "份", "nutrition_info": "热量: 280kcal", "today_sales": 38, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 19, "name": "小米粥", "category": "主食", "price": 3.0, "unit": "份", "nutrition_info": "热量: 60kcal", "today_sales": 55, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}, {"id": 20, "name": "可乐鸡翅", "category": "荤菜", "price": 32.0, "unit": "份", "nutrition_info": "热量: 290kcal", "today_sales": 42, "status": "available", "image": null, "created_at": "2026-05-29 06:03:34"}], "canteen_orders": [{"id": 1, "order_no": "DC2026052901", "customer_name": "李明华", "customer_phone": "138****6789", "dishes": "糖醋排骨+鱼香肉丝", "meal_type": "午餐", "amount": 60.0, "status": "confirmed", "created_at": "2026-05-29 11:03", "completed_at": null, "remark": null}, {"id": 2, "order_no": "DC2026052902", "customer_name": "王建国", "customer_phone": "139****2234", "dishes": "麻婆豆腐+酸辣土豆丝+凉拌木耳", "meal_type": "早餐", "amount": 35.0, "status": "pending", "created_at": "2026-05-29 09:03", "completed_at": null, "remark": null}, {"id": 3, "order_no": "DC2026052903", "customer_name": "张秀英", "customer_phone": "136****8876", "dishes": "糖醋排骨+宫保鸡丁+红烧肉", "meal_type": "早餐", "amount": 91.0, "status": "pending", "created_at": "2026-05-29 11:03", "completed_at": null, "remark": null}, {"id": 4, "order_no": "DC2026052904", "customer_name": "陈桂兰", "customer_phone": "135****4532", "dishes": "糖醋排骨+番茄炒蛋", "meal_type": "晚餐", "amount": 50.0, "status": "confirmed", "created_at": "2026-05-29 09:03", "completed_at": null, "remark": null}, {"id": 5, "order_no": "DC2026052905", "customer_name": "刘德华", "customer_phone": "137****9988", "dishes": "番茄炒蛋+酸辣土豆丝+紫菜蛋花汤", "meal_type": "早餐", "amount": 27.0, "status": "confirmed", "created_at": "2026-05-29 06:03", "completed_at": null, "remark": null}, {"id": 6, "order_no": "DC2026052906", "customer_name": "周润发", "customer_phone": "158****7766", "dishes": "酸辣土豆丝", "meal_type": "晚餐", "amount": 10.0, "status": "pending", "created_at": "2026-05-29 09:03", "completed_at": null, "remark": null}, {"id": 7, "order_no": "DC2026052907", "customer_name": "吴亦凡", "customer_phone": "159****6655", "dishes": "番茄炒蛋+宫保鸡丁+清炒时蔬", "meal_type": "晚餐", "amount": 45.0, "status": "pending", "created_at": "2026-05-29 02:03", "completed_at": null, "remark": null}, {"id": 8, "order_no": "DC2026052908", "customer_name": "成龙", "customer_phone": "186****5544", "dishes": "清炒时蔬", "meal_type": "早餐", "amount": 8.0, "status": "pending", "created_at": "2026-05-29 11:03", "completed_at": null, "remark": null}, {"id": 9, "order_no": "DC2026052909", "customer_name": "李连杰", "customer_phone": "187****3322", "dishes": "西红柿鸡蛋汤+麻婆豆腐+清蒸鲈鱼", "meal_type": "晚餐", "amount": 55.0, "status": "completed", "created_at": "2026-05-29 06:03", "completed_at": null, "remark": null}, {"id": 10, "order_no": "DC2026052910", "customer_name": "甄子丹", "customer_phone": "188****1100", "dishes": "凉拌木耳+清蒸鲈鱼", "meal_type": "早餐", "amount": 45.0, "status": "pending", "created_at": "2026-05-29 09:03", "completed_at": null, "remark": null}, {"id": 11, "order_no": "DC2026052911", "customer_name": "赵丽颖", "customer_phone": "189****2277", "dishes": "红烧肉", "meal_type": "午餐", "amount": 28.0, "status": "confirmed", "created_at": "2026-05-29 13:03", "completed_at": null, "remark": null}, {"id": 12, "order_no": "DC2026052912", "customer_name": "杨幂", "customer_phone": "158****3388", "dishes": "糖醋排骨+玉米排骨汤", "meal_type": "晚餐", "amount": 53.0, "status": "completed", "created_at": "2026-05-29 05:03", "completed_at": null, "remark": null}, {"id": 13, "order_no": "DC2026052913", "customer_name": "迪丽热巴", "customer_phone": "159****4499", "dishes": "玉米排骨汤+凉拌黄瓜", "meal_type": "早餐", "amount": 23.0, "status": "completed", "created_at": "2026-05-29 14:03", "completed_at": null, "remark": null}, {"id": 14, "order_no": "DC2026052914", "customer_name": "Angelababy", "customer_phone": "186****5566", "dishes": "凉拌木耳", "meal_type": "晚餐", "amount": 10.0, "status": "confirmed", "created_at": "2026-05-29 04:03", "completed_at": null, "remark": null}, {"id": 15, "order_no": "DC2026052915", "customer_name": "范冰冰", "customer_phone": "187****7788", "dishes": "酸辣土豆丝+玉米排骨汤+清炒时蔬", "meal_type": "早餐", "amount": 33.0, "status": "completed", "created_at": "2026-05-29 05:03", "completed_at": null, "remark": null}], "ingredients": [{"id": 1, "name": "猪肉", "category": "肉类", "unit": "kg", "stock": 5.0, "min_stock": 20.0, "price": 28.0, "supplier": "永辉超市", "expire_date": null, "status": "low", "updated_at": "2026-05-29 06:03:34"}, {"id": 2, "name": "牛肉", "category": "肉类", "unit": "kg", "stock": 15.0, "min_stock": 10.0, "price": 45.0, "supplier": "华润万家", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 3, "name": "鸡肉", "category": "肉类", "unit": "kg", "stock": 8.0, "min_stock": 15.0, "price": 18.0, "supplier": "永辉超市", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 4, "name": "新鲜蔬菜", "category": "蔬菜类", "unit": "kg", "stock": 3.0, "min_stock": 20.0, "price": 5.0, "supplier": "本地农场", "expire_date": null, "status": "expire", "updated_at": "2026-05-29 06:03:34"}, {"id": 5, "name": "大米", "category": "主食类", "unit": "kg", "stock": 25.0, "min_stock": 50.0, "price": 3.5, "supplier": "粮食储备库", "expire_date": null, "status": "low", "updated_at": "2026-05-29 06:03:34"}, {"id": 6, "name": "鸡蛋", "category": "禽蛋类", "unit": "kg", "stock": 10.0, "min_stock": 20.0, "price": 8.0, "supplier": "华润万家", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 7, "name": "面粉", "category": "主食类", "unit": "kg", "stock": 40.0, "min_stock": 30.0, "price": 4.0, "supplier": "粮食储备库", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 8, "name": "食用油", "category": "调料类", "unit": "L", "stock": 20.0, "min_stock": 10.0, "price": 15.0, "supplier": "永辉超市", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 9, "name": "豆腐", "category": "豆制品", "unit": "kg", "stock": 8.0, "min_stock": 15.0, "price": 6.0, "supplier": "本地作坊", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 10, "name": "土豆", "category": "蔬菜类", "unit": "kg", "stock": 30.0, "min_stock": 25.0, "price": 2.5, "supplier": "本地农场", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}, {"id": 11, "name": "番茄", "category": "蔬菜类", "unit": "kg", "stock": 5.0, "min_stock": 15.0, "price": 4.0, "supplier": "本地农场", "expire_date": null, "status": "expire", "updated_at": "2026-05-29 06:03:34"}, {"id": 12, "name": "白菜", "category": "蔬菜类", "unit": "kg", "stock": 12.0, "min_stock": 20.0, "price": 2.0, "supplier": "本地农场", "expire_date": null, "status": "normal", "updated_at": "2026-05-29 06:03:34"}], "property_fees": [{"id": 1, "fee_no": "WY2026052901", "resident_name": "迪丽热巴", "resident_phone": "159****4499", "building": "5栋", "unit": "2单元", "room_no": "601", "fee_type": "停车费", "fee_period": "2026年05月", "amount": 300.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-06-05", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "fee_no": "WY2026052902", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "8栋", "unit": "1单元", "room_no": "301", "fee_type": "停车费", "fee_period": "2026年05月", "amount": 300.0, "paid_amount": 0.0, "status": "overdue", "due_date": "2026-06-13", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "fee_no": "WY2026052903", "resident_name": "王建国", "resident_phone": "139****2234", "building": "1栋", "unit": "1单元", "room_no": "201", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 57.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-01", "paid_date": "2026-05-27", "payment_method": "微信支付", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "fee_no": "WY2026052904", "resident_name": "陈桂兰", "resident_phone": "135****4532", "building": "3栋", "unit": "3单元", "room_no": "701", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 78.0, "paid_amount": 0.0, "status": "overdue", "due_date": "2026-06-11", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "fee_no": "WY2026052905", "resident_name": "赵丽颖", "resident_phone": "189****2277", "building": "4栋", "unit": "3单元", "room_no": "701", "fee_type": "物业费", "fee_period": "2026年05月", "amount": 285.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-04", "paid_date": "2026-05-21", "payment_method": "现金", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "fee_no": "WY2026052906", "resident_name": "张秀英", "resident_phone": "136****8876", "building": "2栋", "unit": "1单元", "room_no": "401", "fee_type": "垃圾清运费", "fee_period": "2026年05月", "amount": 20.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-06-08", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "fee_no": "WY2026052907", "resident_name": "甄子丹", "resident_phone": "188****1100", "building": "8栋", "unit": "1单元", "room_no": "801", "fee_type": "电费", "fee_period": "2026年05月", "amount": 155.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-06-03", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "fee_no": "WY2026052908", "resident_name": "李连杰", "resident_phone": "187****3322", "building": "5栋", "unit": "2单元", "room_no": "901", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 63.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-07", "paid_date": "2026-05-20", "payment_method": "支付宝", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "fee_no": "WY2026052909", "resident_name": "甄子丹", "resident_phone": "188****1100", "building": "8栋", "unit": "2单元", "room_no": "501", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 78.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-05-30", "paid_date": "2026-05-25", "payment_method": "微信支付", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "fee_no": "WY2026052910", "resident_name": "迪丽热巴", "resident_phone": "159****4499", "building": "1栋", "unit": "1单元", "room_no": "1001", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 40.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-06-07", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "fee_no": "WY2026052911", "resident_name": "范冰冰", "resident_phone": "187****7788", "building": "2栋", "unit": "1单元", "room_no": "401", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 49.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-05-31", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "fee_no": "WY2026052912", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "4栋", "unit": "3单元", "room_no": "601", "fee_type": "电费", "fee_period": "2026年05月", "amount": 220.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-06-04", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "fee_no": "WY2026052913", "resident_name": "迪丽热巴", "resident_phone": "159****4499", "building": "6栋", "unit": "1单元", "room_no": "501", "fee_type": "垃圾清运费", "fee_period": "2026年05月", "amount": 42.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-12", "paid_date": "2026-05-25", "payment_method": "现金", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "fee_no": "WY2026052914", "resident_name": "Angelababy", "resident_phone": "186****5566", "building": "1栋", "unit": "1单元", "room_no": "401", "fee_type": "停车费", "fee_period": "2026年05月", "amount": 300.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-11", "paid_date": "2026-05-27", "payment_method": "现金", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "fee_no": "WY2026052915", "resident_name": "张秀英", "resident_phone": "136****8876", "building": "7栋", "unit": "2单元", "room_no": "501", "fee_type": "物业费", "fee_period": "2026年05月", "amount": 381.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-04", "paid_date": "2026-05-23", "payment_method": "支付宝", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 16, "fee_no": "WY2026052916", "resident_name": "成龙", "resident_phone": "186****5544", "building": "5栋", "unit": "1单元", "room_no": "1001", "fee_type": "水费", "fee_period": "2026年05月", "amount": 100.0, "paid_amount": 0.0, "status": "unpaid", "due_date": "2026-05-30", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 17, "fee_no": "WY2026052917", "resident_name": "张秀英", "resident_phone": "136****8876", "building": "6栋", "unit": "3单元", "room_no": "701", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 41.0, "paid_amount": 0.0, "status": "overdue", "due_date": "2026-05-31", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 18, "fee_no": "WY2026052918", "resident_name": "杨幂", "resident_phone": "158****3388", "building": "1栋", "unit": "3单元", "room_no": "501", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 37.0, "paid_amount": 0.0, "status": "overdue", "due_date": "2026-06-10", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 19, "fee_no": "WY2026052919", "resident_name": "赵丽颖", "resident_phone": "189****2277", "building": "2栋", "unit": "3单元", "room_no": "501", "fee_type": "水费", "fee_period": "2026年05月", "amount": 64.0, "paid_amount": 0.0, "status": "overdue", "due_date": "2026-05-30", "paid_date": null, "payment_method": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 20, "fee_no": "WY2026052920", "resident_name": "Angelababy", "resident_phone": "186****5566", "building": "4栋", "unit": "1单元", "room_no": "901", "fee_type": "燃气费", "fee_period": "2026年05月", "amount": 75.0, "paid_amount": 0.0, "status": "paid", "due_date": "2026-06-10", "paid_date": "2026-05-23", "payment_method": "支付宝", "remark": null, "created_at": "2026-05-29 06:03:34"}], "repair_orders": [{"id": 1, "order_no": "BX2026052901", "resident_name": "吴亦凡", "resident_phone": "159****6655", "building": "2栋", "unit": "1单元", "room_no": "1001", "repair_type": "门窗维修", "repair_desc": "门锁松动/窗户关不严", "urgency": "low", "status": "processing", "assignee_id": 6, "assignee_name": "周师傅", "appointment_time": "2026-05-29 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "order_no": "BX2026052902", "resident_name": "杨幂", "resident_phone": "158****3388", "building": "8栋", "unit": "3单元", "room_no": "501", "repair_type": "水电维修", "repair_desc": "水龙头漏水/插座不通电", "urgency": "normal", "status": "completed", "assignee_id": 3, "assignee_name": "王阿姨", "appointment_time": "2026-05-30 14:03", "completed_at": "2026-05-27 14:03", "rating": 4, "review": "很快就修好了", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "order_no": "BX2026052903", "resident_name": "张秀英", "resident_phone": "136****8876", "building": "1栋", "unit": "1单元", "room_no": "701", "repair_type": "门窗维修", "repair_desc": "门锁松动/窗户关不严", "urgency": "normal", "status": "pending", "assignee_id": null, "assignee_name": null, "appointment_time": "2026-05-30 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "order_no": "BX2026052904", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "2栋", "unit": "2单元", "room_no": "1001", "repair_type": "公共设施", "repair_desc": "楼道灯损坏", "urgency": "normal", "status": "completed", "assignee_id": 2, "assignee_name": "李师傅", "appointment_time": "2026-05-30 14:03", "completed_at": "2026-05-29 14:03", "rating": 5, "review": "维修及时，服务好", "created_at": "2026-05-29 06:03:34"}, {"id": 5, "order_no": "BX2026052905", "resident_name": "张秀英", "resident_phone": "136****8876", "building": "6栋", "unit": "3单元", "room_no": "401", "repair_type": "家电维修", "repair_desc": "空调不制冷/冰箱不工作", "urgency": "urgent", "status": "processing", "assignee_id": 3, "assignee_name": "王阿姨", "appointment_time": "2026-05-31 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "order_no": "BX2026052906", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "5栋", "unit": "3单元", "room_no": "201", "repair_type": "门窗维修", "repair_desc": "门锁松动/窗户关不严", "urgency": "low", "status": "assigned", "assignee_id": 2, "assignee_name": "李师傅", "appointment_time": "2026-05-29 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "order_no": "BX2026052907", "resident_name": "周润发", "resident_phone": "158****7766", "building": "6栋", "unit": "3单元", "room_no": "401", "repair_type": "门窗维修", "repair_desc": "门锁松动/窗户关不严", "urgency": "normal", "status": "processing", "assignee_id": 6, "assignee_name": "周师傅", "appointment_time": "2026-05-29 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "order_no": "BX2026052908", "resident_name": "范冰冰", "resident_phone": "187****7788", "building": "2栋", "unit": "1单元", "room_no": "1001", "repair_type": "家电维修", "repair_desc": "空调不制冷/冰箱不工作", "urgency": "normal", "status": "completed", "assignee_id": 2, "assignee_name": "李师傅", "appointment_time": "2026-05-30 14:03", "completed_at": "2026-05-29 14:03", "rating": 3, "review": "很快就修好了", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "order_no": "BX2026052909", "resident_name": "李连杰", "resident_phone": "187****3322", "building": "3栋", "unit": "3单元", "room_no": "501", "repair_type": "灯具维修", "repair_desc": "卧室灯不亮", "urgency": "low", "status": "completed", "assignee_id": 3, "assignee_name": "王阿姨", "appointment_time": "2026-05-30 14:03", "completed_at": "2026-05-29 14:03", "rating": 5, "review": "很快就修好了", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "order_no": "BX2026052910", "resident_name": "陈桂兰", "resident_phone": "135****4532", "building": "2栋", "unit": "3单元", "room_no": "501", "repair_type": "门锁维修", "repair_desc": "防盗门锁芯损坏", "urgency": "high", "status": "pending", "assignee_id": null, "assignee_name": null, "appointment_time": "2026-05-30 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "order_no": "BX2026052911", "resident_name": "迪丽热巴", "resident_phone": "159****4499", "building": "4栋", "unit": "1单元", "room_no": "1001", "repair_type": "门锁维修", "repair_desc": "防盗门锁芯损坏", "urgency": "urgent", "status": "processing", "assignee_id": 5, "assignee_name": "刘师傅", "appointment_time": "2026-05-31 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "order_no": "BX2026052912", "resident_name": "吴亦凡", "resident_phone": "159****6655", "building": "8栋", "unit": "2单元", "room_no": "801", "repair_type": "门窗维修", "repair_desc": "门锁松动/窗户关不严", "urgency": "urgent", "status": "processing", "assignee_id": 4, "assignee_name": "陈大姐", "appointment_time": "2026-05-29 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "order_no": "BX2026052913", "resident_name": "范冰冰", "resident_phone": "187****7788", "building": "2栋", "unit": "3单元", "room_no": "601", "repair_type": "门锁维修", "repair_desc": "防盗门锁芯损坏", "urgency": "high", "status": "completed", "assignee_id": 4, "assignee_name": "陈大姐", "appointment_time": "2026-05-31 14:03", "completed_at": "2026-05-29 14:03", "rating": 4, "review": "态度认真，很满意", "created_at": "2026-05-29 06:03:34"}, {"id": 14, "order_no": "BX2026052914", "resident_name": "Angelababy", "resident_phone": "186****5566", "building": "1栋", "unit": "1单元", "room_no": "201", "repair_type": "灯具维修", "repair_desc": "卧室灯不亮", "urgency": "low", "status": "processing", "assignee_id": 5, "assignee_name": "刘师傅", "appointment_time": "2026-05-30 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "order_no": "BX2026052915", "resident_name": "赵丽颖", "resident_phone": "189****2277", "building": "1栋", "unit": "1单元", "room_no": "901", "repair_type": "下水道堵塞", "repair_desc": "厨房下水道堵塞", "urgency": "normal", "status": "pending", "assignee_id": null, "assignee_name": null, "appointment_time": "2026-05-29 14:03", "completed_at": null, "rating": null, "review": null, "created_at": "2026-05-29 06:03:34"}], "visitor_records": [{"id": 1, "visitor_name": "周杰", "visitor_phone": "138****2706", "visitor_id_no": null, "visited_building": "4栋", "visited_unit": "3单元", "visited_room": "301", "visited_resident": "迪丽热巴", "visit_purpose": "维修服务", "entry_time": "2026-05-28 05:03", "exit_time": "2026-05-28 09:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "visitor_name": "张伟", "visitor_phone": "138****6481", "visitor_id_no": null, "visited_building": "8栋", "visited_unit": "2单元", "visited_room": "301", "visited_resident": "Angelababy", "visit_purpose": "维修服务", "entry_time": "2026-05-29 11:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "visitor_name": "吴婷", "visitor_phone": "138****3145", "visitor_id_no": null, "visited_building": "4栋", "visited_unit": "2单元", "visited_room": "501", "visited_resident": "吴亦凡", "visit_purpose": "家政服务", "entry_time": "2026-05-29 12:03", "exit_time": "2026-05-29 13:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "visitor_name": "李娜", "visitor_phone": "138****2775", "visitor_id_no": null, "visited_building": "3栋", "visited_unit": "1单元", "visited_room": "101", "visited_resident": "赵丽颖", "visit_purpose": "送货安装", "entry_time": "2026-05-28 05:03", "exit_time": "2026-05-28 07:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "visitor_name": "李娜", "visitor_phone": "138****1679", "visitor_id_no": null, "visited_building": "6栋", "visited_unit": "1单元", "visited_room": "801", "visited_resident": "张秀英", "visit_purpose": "维修服务", "entry_time": "2026-05-28 14:03", "exit_time": "2026-05-28 17:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "visitor_name": "张伟", "visitor_phone": "138****1504", "visitor_id_no": null, "visited_building": "5栋", "visited_unit": "2单元", "visited_room": "501", "visited_resident": "赵丽颖", "visit_purpose": "送货安装", "entry_time": "2026-05-29 04:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "visitor_name": "赵磊", "visitor_phone": "138****7898", "visitor_id_no": null, "visited_building": "6栋", "visited_unit": "3单元", "visited_room": "601", "visited_resident": "张秀英", "visit_purpose": "家政服务", "entry_time": "2026-05-28 05:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "visitor_name": "吴婷", "visitor_phone": "138****8218", "visitor_id_no": null, "visited_building": "5栋", "visited_unit": "3单元", "visited_room": "501", "visited_resident": "甄子丹", "visit_purpose": "家政服务", "entry_time": "2026-05-29 04:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "visitor_name": "张伟", "visitor_phone": "138****2563", "visitor_id_no": null, "visited_building": "6栋", "visited_unit": "1单元", "visited_room": "501", "visited_resident": "杨幂", "visit_purpose": "快递外卖", "entry_time": "2026-05-28 23:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "visitor_name": "黄敏", "visitor_phone": "138****1052", "visitor_id_no": null, "visited_building": "8栋", "visited_unit": "1单元", "visited_room": "801", "visited_resident": "甄子丹", "visit_purpose": "维修服务", "entry_time": "2026-05-28 12:03", "exit_time": "2026-05-28 16:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "visitor_name": "杨丽", "visitor_phone": "138****6905", "visitor_id_no": null, "visited_building": "3栋", "visited_unit": "2单元", "visited_room": "501", "visited_resident": "迪丽热巴", "visit_purpose": "看房租房", "entry_time": "2026-05-27 14:03", "exit_time": "2026-05-27 18:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "visitor_name": "黄敏", "visitor_phone": "138****4373", "visitor_id_no": null, "visited_building": "8栋", "visited_unit": "1单元", "visited_room": "401", "visited_resident": "范冰冰", "visit_purpose": "朋友聚会", "entry_time": "2026-05-29 01:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "visitor_name": "吴婷", "visitor_phone": "138****9303", "visitor_id_no": null, "visited_building": "6栋", "visited_unit": "3单元", "visited_room": "701", "visited_resident": "Angelababy", "visit_purpose": "看房租房", "entry_time": "2026-05-28 12:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "visitor_name": "陈明", "visitor_phone": "138****3756", "visitor_id_no": null, "visited_building": "2栋", "visited_unit": "1单元", "visited_room": "401", "visited_resident": "王建国", "visit_purpose": "朋友聚会", "entry_time": "2026-05-28 07:03", "exit_time": null, "status": "inside", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "visitor_name": "李娜", "visitor_phone": "138****1273", "visitor_id_no": null, "visited_building": "1栋", "visited_unit": "1单元", "visited_room": "601", "visited_resident": "王建国", "visit_purpose": "送货安装", "entry_time": "2026-05-29 08:03", "exit_time": "2026-05-29 11:03", "status": "outside", "remark": null, "created_at": "2026-05-29 06:03:34"}], "announcements": [{"id": 1, "title": "关于缴纳2024年物业费的通知", "content": "请各位业主于本月15日前完成物业费缴纳，可通过微信、支付宝等方式在线缴费。", "category": "normal", "is_top": 1, "is_urgent": 0, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-25 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 2, "title": "小区停水通知", "content": "因市政管网改造，明天上午9:00-12:00全小区停水，请各位业主提前储水。", "category": "urgent", "is_top": 1, "is_urgent": 1, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-20 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "title": "端午节活动邀请", "content": "端午佳节将至，物业将于6月10日在小区广场举办包粽子活动，欢迎大家参加！", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "社区居委会", "view_count": 0, "status": "published", "published_at": "2026-05-29 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 4, "title": "电梯维保通知", "content": "本周将对3栋、5栋电梯进行例行维保，届时电梯将暂停使用，给您带来不便请谅解。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "电梯维保单位", "view_count": 0, "status": "published", "published_at": "2026-05-24 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 5, "title": "垃圾分类温馨提示", "content": "请各位业主严格按照垃圾分类要求投放垃圾，共同维护小区环境。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-22 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 6, "title": "暑期兴趣班报名通知", "content": "社区活动中心将举办暑期少儿兴趣班，包括绘画、书法、舞蹈等，即日起接受报名。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "社区活动中心", "view_count": 0, "status": "published", "published_at": "2026-05-23 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 7, "title": "消防演习公告", "content": "本月15日将进行消防演习，请各位业主配合，届时会有警报声，请勿惊慌。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "安保部", "view_count": 0, "status": "published", "published_at": "2026-05-28 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 8, "title": "游泳池开放通知", "content": "小区游泳池即日起正式开放，开放时间7:00-21:00，请遵守泳池管理规定。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-19 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "title": "车辆管理系统升级", "content": "停车场管理系统将进行升级，届时请车主及时更新车辆信息。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-21 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "title": "中秋节放假安排", "content": "中秋节期间物业服务大厅放假3天，如有紧急事务请联系24小时值班电话。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-28 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 11, "title": "疫情防控通知", "content": "鉴于当前疫情防控形势，请各位业主继续做好个人防护，配合门禁测温。", "category": "urgent", "is_top": 0, "is_urgent": 1, "publisher": "物业管理处", "view_count": 0, "status": "published", "published_at": "2026-05-29 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 12, "title": "绿化改造施工公告", "content": "小区绿化带将进行改造施工，届时部分区域会有围挡，请注意安全。", "category": "normal", "is_top": 0, "is_urgent": 0, "publisher": "园林绿化部", "view_count": 0, "status": "published", "published_at": "2026-05-22 14:03", "created_at": "2026-05-29 06:03:34"}], "parking_spaces": [{"id": 1, "space_no": "地下一层-01号", "area": "地下一层", "space_type": "normal", "status": "reserved", "plate_no": "鄂A77677", "resident_name": "张秀英", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-20", "card_end_date": "2026-06-08", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "space_no": "B区-02号", "area": "B区", "space_type": "normal", "status": "occupied", "plate_no": "鄂A29495", "resident_name": "李明华", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-02-13", "card_end_date": "2026-08-17", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "space_no": "B区-03号", "area": "B区", "space_type": "normal", "status": "reserved", "plate_no": "鄂A60935", "resident_name": "甄子丹", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-27", "card_end_date": "2026-10-21", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "space_no": "C区-04号", "area": "C区", "space_type": "normal", "status": "occupied", "plate_no": "鄂A39162", "resident_name": "王建国", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-02-03", "card_end_date": "2026-09-15", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "space_no": "C区-05号", "area": "C区", "space_type": "electric", "status": "reserved", "plate_no": "鄂A77486", "resident_name": "Angelababy", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-03-24", "card_end_date": "2026-09-27", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "space_no": "地下二层-06号", "area": "地下二层", "space_type": "electric", "status": "occupied", "plate_no": "鄂A61904", "resident_name": "吴亦凡", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-03-30", "card_end_date": "2026-08-29", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "space_no": "A区-07号", "area": "A区", "space_type": "electric", "status": "occupied", "plate_no": "鄂A94470", "resident_name": "成龙", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-02-04", "card_end_date": "2026-11-14", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "space_no": "B区-08号", "area": "B区", "space_type": "electric", "status": "occupied", "plate_no": "鄂A85803", "resident_name": "刘德华", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-03-15", "card_end_date": "2026-07-02", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "space_no": "C区-09号", "area": "C区", "space_type": "large", "status": "reserved", "plate_no": "鄂A68190", "resident_name": "范冰冰", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2025-12-22", "card_end_date": "2026-09-30", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "space_no": "地下一层-10号", "area": "地下一层", "space_type": "large", "status": "occupied", "plate_no": "鄂A65654", "resident_name": "杨幂", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-02-10", "card_end_date": "2026-07-27", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "space_no": "B区-11号", "area": "B区", "space_type": "electric", "status": "available", "plate_no": null, "resident_name": null, "resident_phone": null, "monthly_fee": 300.0, "card_start_date": null, "card_end_date": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "space_no": "地下一层-12号", "area": "地下一层", "space_type": "large", "status": "available", "plate_no": null, "resident_name": null, "resident_phone": null, "monthly_fee": 300.0, "card_start_date": null, "card_end_date": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "space_no": "C区-13号", "area": "C区", "space_type": "normal", "status": "available", "plate_no": null, "resident_name": null, "resident_phone": null, "monthly_fee": 300.0, "card_start_date": null, "card_end_date": null, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "space_no": "B区-14号", "area": "B区", "space_type": "normal", "status": "reserved", "plate_no": "鄂A91333", "resident_name": "范冰冰", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-06", "card_end_date": "2026-07-13", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "space_no": "A区-15号", "area": "A区", "space_type": "normal", "status": "occupied", "plate_no": "鄂A49603", "resident_name": "周润发", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-16", "card_end_date": "2026-10-06", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 16, "space_no": "地下一层-16号", "area": "地下一层", "space_type": "electric", "status": "occupied", "plate_no": "鄂A42107", "resident_name": "张秀英", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-30", "card_end_date": "2026-07-02", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 17, "space_no": "地下一层-17号", "area": "地下一层", "space_type": "large", "status": "reserved", "plate_no": "鄂A27252", "resident_name": "张秀英", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2025-12-23", "card_end_date": "2026-10-07", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 18, "space_no": "地下一层-18号", "area": "地下一层", "space_type": "normal", "status": "occupied", "plate_no": "鄂A45066", "resident_name": "范冰冰", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-05-12", "card_end_date": "2026-08-30", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 19, "space_no": "地下二层-19号", "area": "地下二层", "space_type": "large", "status": "occupied", "plate_no": "鄂A48986", "resident_name": "周润发", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-02-20", "card_end_date": "2026-06-23", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 20, "space_no": "C区-20号", "area": "C区", "space_type": "large", "status": "reserved", "plate_no": "鄂A24684", "resident_name": "李明华", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-25", "card_end_date": "2026-09-06", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 21, "space_no": "A区-21号", "area": "A区", "space_type": "electric", "status": "reserved", "plate_no": "鄂A69921", "resident_name": "刘德华", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-01-21", "card_end_date": "2026-10-09", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 22, "space_no": "B区-22号", "area": "B区", "space_type": "normal", "status": "reserved", "plate_no": "鄂A98300", "resident_name": "Angelababy", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2025-12-07", "card_end_date": "2026-08-18", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 23, "space_no": "B区-23号", "area": "B区", "space_type": "normal", "status": "occupied", "plate_no": "鄂A63078", "resident_name": "刘德华", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-02-18", "card_end_date": "2026-08-27", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 24, "space_no": "地下一层-24号", "area": "地下一层", "space_type": "large", "status": "occupied", "plate_no": "鄂A19634", "resident_name": "李明华", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-01-29", "card_end_date": "2026-10-08", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 25, "space_no": "C区-25号", "area": "C区", "space_type": "normal", "status": "reserved", "plate_no": "鄂A88580", "resident_name": "甄子丹", "resident_phone": null, "monthly_fee": 300.0, "card_start_date": "2026-04-10", "card_end_date": "2026-11-08", "remark": null, "created_at": "2026-05-29 06:03:34"}], "parking_records": [{"id": 1, "record_no": "TC2026052901", "plate_no": "鄂A71198", "space_no": null, "entry_time": "2026-05-28 23:03", "exit_time": "2026-05-29 07:03", "duration": 8, "fee": 40.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 2, "record_no": "TC2026052902", "plate_no": "鄂A32637", "space_no": null, "entry_time": "2026-05-29 13:03", "exit_time": "2026-05-29 17:03", "duration": 4, "fee": 20.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "record_no": "TC2026052903", "plate_no": "鄂A44906", "space_no": null, "entry_time": "2026-05-28 20:03", "exit_time": "2026-05-28 22:03", "duration": 2, "fee": 10.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 4, "record_no": "TC2026052904", "plate_no": "鄂A61967", "space_no": null, "entry_time": "2026-05-29 05:03", "exit_time": null, "duration": 0, "fee": 0.0, "status": "parking", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 5, "record_no": "TC2026052905", "plate_no": "鄂A66313", "space_no": null, "entry_time": "2026-05-29 06:03", "exit_time": "2026-05-29 14:03", "duration": 8, "fee": 40.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 6, "record_no": "TC2026052906", "plate_no": "鄂A50991", "space_no": null, "entry_time": "2026-05-29 03:03", "exit_time": "2026-05-29 04:03", "duration": 1, "fee": 5.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 7, "record_no": "TC2026052907", "plate_no": "鄂A50187", "space_no": null, "entry_time": "2026-05-29 05:03", "exit_time": null, "duration": 0, "fee": 0.0, "status": "parking", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 8, "record_no": "TC2026052908", "plate_no": "鄂A26495", "space_no": null, "entry_time": "2026-05-29 00:03", "exit_time": "2026-05-29 02:03", "duration": 2, "fee": 10.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "record_no": "TC2026052909", "plate_no": "鄂A52970", "space_no": null, "entry_time": "2026-05-29 14:03", "exit_time": "2026-05-29 18:03", "duration": 4, "fee": 20.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "record_no": "TC2026052910", "plate_no": "鄂A93751", "space_no": null, "entry_time": "2026-05-28 15:03", "exit_time": null, "duration": 0, "fee": 0.0, "status": "parking", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 11, "record_no": "TC2026052911", "plate_no": "鄂A44131", "space_no": null, "entry_time": "2026-05-29 04:03", "exit_time": "2026-05-29 08:03", "duration": 4, "fee": 20.0, "status": "exited", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}, {"id": 12, "record_no": "TC2026052912", "plate_no": "鄂A83598", "space_no": null, "entry_time": "2026-05-29 05:03", "exit_time": null, "duration": 0, "fee": 0.0, "status": "parking", "payment_status": "unpaid", "created_at": "2026-05-29 06:03:34"}], "health_records": [{"id": 1, "resident_name": "甄子丹", "resident_phone": "188****1100", "building": "万科城5栋", "room_no": "1", "record_type": "血氧", "record_value": "97%", "record_time": "2026-05-20 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "resident_name": "甄子丹", "resident_phone": "188****1100", "building": "万科城5栋", "room_no": "1", "record_type": "血氧", "record_value": "98%", "record_time": "2026-05-22 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "resident_name": "刘德华", "resident_phone": "137****9988", "building": "阳光城4栋", "room_no": "2", "record_type": "血糖", "record_value": "106 mg/dL", "record_time": "2026-05-03 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "resident_name": "范冰冰", "resident_phone": "187****7788", "building": "绿地中心1栋", "room_no": "3", "record_type": "血糖", "record_value": "119 mg/dL", "record_time": "2026-05-21 14:03", "is_abnormal": 1, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "resident_name": "范冰冰", "resident_phone": "187****7788", "building": "绿地中心1栋", "room_no": "3", "record_type": "血压", "record_value": "103/97", "record_time": "2026-05-27 14:03", "is_abnormal": 1, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "resident_name": "张秀英", "resident_phone": "136****8876", "building": "怡景苑7栋", "room_no": "3", "record_type": "血压", "record_value": "134/93", "record_time": "2026-04-29 14:03", "is_abnormal": 1, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "resident_name": "成龙", "resident_phone": "186****5544", "building": "碧桂园8栋", "room_no": "2", "record_type": "体温", "record_value": "37.0℃", "record_time": "2026-05-23 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "resident_name": "李连杰", "resident_phone": "187****3322", "building": "金地花园3栋", "room_no": "4", "record_type": "体温", "record_value": "36.5℃", "record_time": "2026-05-14 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "resident_name": "杨幂", "resident_phone": "158****3388", "building": "华润城7栋", "room_no": "2", "record_type": "血糖", "record_value": "57 mg/dL", "record_time": "2026-05-16 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "resident_name": "李明华", "resident_phone": "138****6789", "building": "碧水园3栋", "room_no": "2", "record_type": "心率", "record_value": "59 次/分", "record_time": "2026-05-04 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "resident_name": "周润发", "resident_phone": "158****7766", "building": "绿景花园1栋", "room_no": "3", "record_type": "血糖", "record_value": "80 mg/dL", "record_time": "2026-05-15 14:03", "is_abnormal": 1, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "resident_name": "甄子丹", "resident_phone": "188****1100", "building": "万科城5栋", "room_no": "1", "record_type": "体温", "record_value": "37.3℃", "record_time": "2026-05-22 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "resident_name": "刘德华", "resident_phone": "137****9988", "building": "阳光城4栋", "room_no": "2", "record_type": "血氧", "record_value": "100%", "record_time": "2026-05-28 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "resident_name": "王建国", "resident_phone": "139****2234", "building": "翠湖居5栋", "room_no": "1", "record_type": "血氧", "record_value": "100%", "record_time": "2026-05-29 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "resident_name": "成龙", "resident_phone": "186****5544", "building": "碧桂园8栋", "room_no": "2", "record_type": "心率", "record_value": "77 次/分", "record_time": "2026-05-01 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 16, "resident_name": "杨幂", "resident_phone": "158****3388", "building": "华润城7栋", "room_no": "2", "record_type": "心率", "record_value": "65 次/分", "record_time": "2026-05-16 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 17, "resident_name": "陈桂兰", "resident_phone": "135****4532", "building": "幸福里2栋", "room_no": "1", "record_type": "心率", "record_value": "99 次/分", "record_time": "2026-05-26 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 18, "resident_name": "李明华", "resident_phone": "138****6789", "building": "碧水园3栋", "room_no": "2", "record_type": "血压", "record_value": "91/64", "record_time": "2026-05-17 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 19, "resident_name": "李连杰", "resident_phone": "187****3322", "building": "金地花园3栋", "room_no": "4", "record_type": "血氧", "record_value": "95%", "record_time": "2026-05-20 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 20, "resident_name": "成龙", "resident_phone": "186****5544", "building": "碧桂园8栋", "room_no": "2", "record_type": "体温", "record_value": "36.2℃", "record_time": "2026-05-21 14:03", "is_abnormal": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}], "care_plans": [{"id": 1, "plan_no": "ZH2026052901", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "阳光城4栋", "room_no": "2", "care_type": "康复训练", "care_content": "协助进行康复体操，每日2次", "frequency": "每周3次", "start_date": "2026-05-22", "end_date": "2026-08-03", "assignee_id": 1, "assignee_name": "张小燕", "status": "completed", "created_at": "2026-05-29 06:03:34"}, {"id": 2, "plan_no": "ZH2026052902", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "阳光城4栋", "room_no": "2", "care_type": "心理疏导", "care_content": "陪伴聊天，关注心理健康", "frequency": "每周5次", "start_date": "2026-05-28", "end_date": "2026-07-27", "assignee_id": 4, "assignee_name": "陈大姐", "status": "completed", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "plan_no": "ZH2026052903", "resident_name": "周润发", "resident_phone": "158****7766", "building": "绿景花园1栋", "room_no": "3", "care_type": "用药提醒", "care_content": "按时提醒服药，协助整理药品", "frequency": "每周5次", "start_date": "2026-05-11", "end_date": "2026-07-25", "assignee_id": 4, "assignee_name": "陈大姐", "status": "completed", "created_at": "2026-05-29 06:03:34"}, {"id": 4, "plan_no": "ZH2026052904", "resident_name": "陈桂兰", "resident_phone": "135****4532", "building": "幸福里2栋", "room_no": "1", "care_type": "用药提醒", "care_content": "按时提醒服药，协助整理药品", "frequency": "每周5次", "start_date": "2026-05-20", "end_date": "2026-08-11", "assignee_id": 1, "assignee_name": "张小燕", "status": "active", "created_at": "2026-05-29 06:03:34"}, {"id": 5, "plan_no": "ZH2026052905", "resident_name": "成龙", "resident_phone": "186****5544", "building": "碧桂园8栋", "room_no": "2", "care_type": "生活照料", "care_content": "协助日常起居，打扫卫生", "frequency": "每月", "start_date": "2026-05-01", "end_date": "2026-08-14", "assignee_id": 1, "assignee_name": "张小燕", "status": "active", "created_at": "2026-05-29 06:03:34"}, {"id": 6, "plan_no": "ZH2026052906", "resident_name": "成龙", "resident_phone": "186****5544", "building": "碧桂园8栋", "room_no": "2", "care_type": "心理疏导", "care_content": "陪伴聊天，关注心理健康", "frequency": "每月", "start_date": "2026-05-29", "end_date": "2026-08-13", "assignee_id": 4, "assignee_name": "陈大姐", "status": "active", "created_at": "2026-05-29 06:03:34"}, {"id": 7, "plan_no": "ZH2026052907", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "阳光城4栋", "room_no": "2", "care_type": "康复训练", "care_content": "协助进行康复体操，每日2次", "frequency": "每周5次", "start_date": "2026-05-21", "end_date": "2026-08-03", "assignee_id": 4, "assignee_name": "陈大姐", "status": "active", "created_at": "2026-05-29 06:03:34"}, {"id": 8, "plan_no": "ZH2026052908", "resident_name": "李连杰", "resident_phone": "187****3322", "building": "金地花园3栋", "room_no": "4", "care_type": "康复训练", "care_content": "协助进行康复体操，每日2次", "frequency": "每日", "start_date": "2026-05-21", "end_date": "2026-07-05", "assignee_id": 1, "assignee_name": "张小燕", "status": "active", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "plan_no": "ZH2026052909", "resident_name": "陈桂兰", "resident_phone": "135****4532", "building": "幸福里2栋", "room_no": "1", "care_type": "心理疏导", "care_content": "陪伴聊天，关注心理健康", "frequency": "每周5次", "start_date": "2026-05-12", "end_date": "2026-08-10", "assignee_id": 1, "assignee_name": "张小燕", "status": "completed", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "plan_no": "ZH2026052910", "resident_name": "刘德华", "resident_phone": "137****9988", "building": "阳光城4栋", "room_no": "2", "care_type": "用药提醒", "care_content": "按时提醒服药，协助整理药品", "frequency": "每周5次", "start_date": "2026-04-29", "end_date": "2026-08-09", "assignee_id": 4, "assignee_name": "陈大姐", "status": "completed", "created_at": "2026-05-29 06:03:34"}, {"id": 11, "plan_no": "ZH2026052911", "resident_name": "陈桂兰", "resident_phone": "135****4532", "building": "幸福里2栋", "room_no": "1", "care_type": "康复训练", "care_content": "协助进行康复体操，每日2次", "frequency": "每日", "start_date": "2026-05-24", "end_date": "2026-08-14", "assignee_id": 4, "assignee_name": "陈大姐", "status": "active", "created_at": "2026-05-29 06:03:34"}, {"id": 12, "plan_no": "ZH2026052912", "resident_name": "李连杰", "resident_phone": "187****3322", "building": "金地花园3栋", "room_no": "4", "care_type": "康复训练", "care_content": "协助进行康复体操，每日2次", "frequency": "每周5次", "start_date": "2026-05-08", "end_date": "2026-07-31", "assignee_id": 4, "assignee_name": "陈大姐", "status": "completed", "created_at": "2026-05-29 06:03:34"}], "sos_records": [{"id": 1, "sos_no": "SOS2026052901", "resident_name": "刘德华", "resident_phone": "137****9988", "sos_location": "阳光城4栋2单元601", "sos_reason": "胸闷气短", "urgency": "urgent", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "sos_no": "SOS2026052902", "resident_name": "Angelababy", "resident_phone": "186****5566", "sos_location": "中海国际4栋5单元1101", "sos_reason": "身体不适", "urgency": "urgent", "status": "handling", "handler_name": "李护士", "handle_result": "已上门查看，情况稳定", "handle_time": "2026-05-29 10:03", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "sos_no": "SOS2026052903", "resident_name": "成龙", "resident_phone": "186****5544", "sos_location": "碧桂园8栋2单元1801", "sos_reason": "胸闷气短", "urgency": "urgent", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "sos_no": "SOS2026052904", "resident_name": "成龙", "resident_phone": "186****5544", "sos_location": "碧桂园8栋2单元1801", "sos_reason": "头晕", "urgency": "high", "status": "handling", "handler_name": "李护士", "handle_result": "已上门查看，情况稳定", "handle_time": "2026-05-29 13:03", "created_at": "2026-05-29 06:03:34"}, {"id": 5, "sos_no": "SOS2026052905", "resident_name": "张秀英", "resident_phone": "136****8876", "sos_location": "怡景苑7栋3单元1102", "sos_reason": "身体不适", "urgency": "high", "status": "handled", "handler_name": "王急救员", "handle_result": "远程指导后缓解", "handle_time": "2026-05-27 21:03", "created_at": "2026-05-29 06:03:34"}, {"id": 6, "sos_no": "SOS2026052906", "resident_name": "迪丽热巴", "resident_phone": "159****4499", "sos_location": "龙湖天街2栋1单元601", "sos_reason": "胸闷气短", "urgency": "urgent", "status": "handled", "handler_name": "张医生", "handle_result": "已送医治疗", "handle_time": "2026-05-29 09:03", "created_at": "2026-05-29 06:03:34"}, {"id": 7, "sos_no": "SOS2026052907", "resident_name": "李明华", "resident_phone": "138****6789", "sos_location": "碧水园3栋2单元1501", "sos_reason": "头晕", "urgency": "high", "status": "handled", "handler_name": "张医生", "handle_result": "误报，已处理", "handle_time": "2026-05-29 00:03", "created_at": "2026-05-29 06:03:34"}, {"id": 8, "sos_no": "SOS2026052908", "resident_name": "赵丽颖", "resident_phone": "189****2277", "sos_location": "保利公园9栋3单元1001", "sos_reason": "摔倒", "urgency": "high", "status": "handled", "handler_name": "李护士", "handle_result": "已上门查看，情况稳定", "handle_time": "2026-05-27 23:03", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "sos_no": "SOS2026052909", "resident_name": "吴亦凡", "resident_phone": "159****6655", "sos_location": "御景湾6栋1单元1201", "sos_reason": "摔倒", "urgency": "urgent", "status": "handling", "handler_name": "李护士", "handle_result": "远程指导后缓解", "handle_time": "2026-05-27 19:03", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "sos_no": "SOS2026052910", "resident_name": "Angelababy", "resident_phone": "186****5566", "sos_location": "中海国际4栋5单元1101", "sos_reason": "头晕", "urgency": "high", "status": "handling", "handler_name": "张医生", "handle_result": "误报，已处理", "handle_time": "2026-05-28 23:03", "created_at": "2026-05-29 06:03:34"}, {"id": 11, "sos_no": "SOS2026052911", "resident_name": "张明华", "resident_phone": "13812345678", "sos_location": "东湖社区3栋2单元501", "sos_reason": "紧急求助", "urgency": "high", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:05:18"}, {"id": 12, "sos_no": "SOS2026052912", "resident_name": "张明华", "resident_phone": "13812345678", "sos_location": "东湖社区3栋2单元501", "sos_reason": "紧急求助", "urgency": "high", "status": "handled", "handler_name": "张医生", "handle_result": "哈哈哈", "handle_time": "2026-05-29 14:55", "created_at": "2026-05-29 06:54:53"}], "activities": [{"id": 1, "activity_no": "HD2026052901", "title": "端午节包粽子活动", "content": "端午节来临之际，组织社区居民一起包粽子，感受传统节日氛围", "activity_type": "文娱活动", "location": "社区广场", "start_time": "2026-06-03 09:00", "end_time": "2026-06-03 12:00", "organizer": "物业管理处", "max_participants": 50, "current_participants": 35, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-28 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 2, "activity_no": "HD2026052902", "title": "暑期少儿绘画班", "content": "专业绘画老师授课，培养孩子艺术兴趣", "activity_type": "教育培训", "location": "社区活动中心203室", "start_time": "2026-06-08 14:00", "end_time": "2026-06-08 16:00", "organizer": "社区活动中心", "max_participants": 20, "current_participants": 12, "fee": 100.0, "cover_image": null, "status": "published", "published_at": "2026-05-27 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "activity_no": "HD2026052903", "title": "健康义诊活动", "content": "邀请武汉市中心医院医生为居民提供免费健康咨询服务", "activity_type": "健康活动", "location": "社区卫生服务中心", "start_time": "2026-06-05 08:30", "end_time": "2026-06-05 11:30", "organizer": "社区卫生服务中心", "max_participants": 100, "current_participants": 78, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-26 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 4, "activity_no": "HD2026052904", "title": "广场舞培训班", "content": "专业舞蹈老师教授广场舞基础动作", "activity_type": "健身活动", "location": "小区广场", "start_time": "2026-06-01 19:00", "end_time": "2026-06-01 20:30", "organizer": "社区舞蹈队", "max_participants": 40, "current_participants": 28, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-27 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 5, "activity_no": "HD2026052905", "title": "亲子阅读分享会", "content": "暑假期间组织亲子阅读，分享读书心得", "activity_type": "教育培训", "location": "社区图书馆", "start_time": "2026-06-12 15:00", "end_time": "2026-06-12 17:00", "organizer": "社区图书馆", "max_participants": 30, "current_participants": 15, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-27 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 6, "activity_no": "HD2026052906", "title": "太极拳晨练营", "content": "每日清晨组织太极拳晨练，锻炼身体", "activity_type": "健身活动", "location": "小区花园", "start_time": "2026-05-30 06:30", "end_time": "2026-05-30 07:30", "organizer": "社区太极拳协会", "max_participants": 25, "current_participants": 20, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-28 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 7, "activity_no": "HD2026052907", "title": "中秋赏月晚会", "content": "中秋佳节举办赏月晚会，有文艺表演和猜灯谜活动", "activity_type": "文娱活动", "location": "社区中心花园", "start_time": "2026-06-28 19:00", "end_time": "2026-06-28 21:30", "organizer": "社区居委会", "max_participants": 80, "current_participants": 45, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-28 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 8, "activity_no": "HD2026052908", "title": "法律知识讲座", "content": "邀请律师为居民讲解房产、继承等法律知识", "activity_type": "教育培训", "location": "社区会议室", "start_time": "2026-06-06 14:00", "end_time": "2026-06-06 16:00", "organizer": "司法所", "max_participants": 60, "current_participants": 32, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-22 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "activity_no": "HD2026052909", "title": "乒乓球友谊赛", "content": "社区乒乓球爱好者友谊赛，锻炼身体增进友谊", "activity_type": "健身活动", "location": "社区活动中心", "start_time": "2026-06-10 09:00", "end_time": "2026-06-10 17:00", "organizer": "社区体育协会", "max_participants": 32, "current_participants": 24, "fee": 20.0, "cover_image": null, "status": "published", "published_at": "2026-05-24 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "activity_no": "HD2026052910", "title": "老年手机使用培训", "content": "教老年人使用智能手机，方便与家人联系", "activity_type": "教育培训", "location": "社区活动中心101室", "start_time": "2026-06-04 10:00", "end_time": "2026-06-04 11:30", "organizer": "中国移动东湖营业厅", "max_participants": 25, "current_participants": 18, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-27 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 11, "activity_no": "HD2026052911", "title": "美食分享会", "content": "居民各自带来拿手菜，共同品尝美食交流厨艺", "activity_type": "文娱活动", "location": "社区餐厅", "start_time": "2026-06-13 11:00", "end_time": "2026-06-13 13:30", "organizer": "社区美食协会", "max_participants": 40, "current_participants": 30, "fee": 30.0, "cover_image": null, "status": "published", "published_at": "2026-05-20 14:03", "created_at": "2026-05-29 06:03:34"}, {"id": 12, "activity_no": "HD2026052912", "title": "家庭园艺讲座", "content": "专业园艺师教您打造美丽阳台花园", "activity_type": "教育培训", "location": "社区活动中心", "start_time": "2026-06-18 14:30", "end_time": "2026-06-18 16:00", "organizer": "小区园林绿化部", "max_participants": 35, "current_participants": 22, "fee": 0.0, "cover_image": null, "status": "published", "published_at": "2026-05-22 14:03", "created_at": "2026-05-29 06:03:34"}], "activity_registrations": [{"id": 1, "activity_id": 1, "resident_name": "刘德华", "resident_phone": "137****9988", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-24 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "activity_id": 2, "resident_name": "李明华", "resident_phone": "138****6789", "participants": 1, "fee": 100.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-24 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "activity_id": 3, "resident_name": "周润发", "resident_phone": "158****7766", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-25 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "activity_id": 4, "resident_name": "杨幂", "resident_phone": "158****3388", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-24 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "activity_id": 5, "resident_name": "刘德华", "resident_phone": "137****9988", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-27 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "activity_id": 6, "resident_name": "甄子丹", "resident_phone": "188****1100", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-26 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "activity_id": 7, "resident_name": "刘德华", "resident_phone": "137****9988", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-24 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "activity_id": 8, "resident_name": "杨幂", "resident_phone": "158****3388", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-24 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "activity_id": 9, "resident_name": "甄子丹", "resident_phone": "188****1100", "participants": 1, "fee": 20.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-25 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "activity_id": 10, "resident_name": "赵丽颖", "resident_phone": "189****2277", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-25 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "activity_id": 11, "resident_name": "王建国", "resident_phone": "139****2234", "participants": 1, "fee": 30.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-27 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "activity_id": 12, "resident_name": "迪丽热巴", "resident_phone": "159****4499", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-26 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "activity_id": 1, "resident_name": "成龙", "resident_phone": "186****5544", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-26 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "activity_id": 2, "resident_name": "成龙", "resident_phone": "186****5544", "participants": 1, "fee": 100.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-26 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "activity_id": 3, "resident_name": "赵丽颖", "resident_phone": "189****2277", "participants": 1, "fee": 0.0, "payment_status": "paid", "status": "registered", "registered_at": "2026-05-26 14:03", "remark": null, "created_at": "2026-05-29 06:03:34"}], "access_control_devices": [{"id": 1, "device_no": "MK001", "device_name": "1栋主入口门禁", "location": "1栋", "device_type": "人脸识别", "status": "online", "last_access_time": "2026-05-29 12:44", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "device_no": "MK002", "device_name": "1栋侧门门禁", "location": "1栋", "device_type": "刷卡", "status": "online", "last_access_time": "2026-05-29 12:33", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "device_no": "MK003", "device_name": "2栋主入口门禁", "location": "2栋", "device_type": "人脸识别", "status": "online", "last_access_time": "2026-05-29 12:06", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "device_no": "MK004", "device_name": "3栋主入口门禁", "location": "3栋", "device_type": "人脸识别", "status": "offline", "last_access_time": "2026-05-29 12:08", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "device_no": "MK005", "device_name": "4栋主入口门禁", "location": "4栋", "device_type": "刷卡", "status": "online", "last_access_time": "2026-05-29 13:10", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "device_no": "MK006", "device_name": "5栋主入口门禁", "location": "5栋", "device_type": "人脸识别", "status": "online", "last_access_time": "2026-05-29 12:07", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "device_no": "MK007", "device_name": "东门人行通道", "location": "东门", "device_type": "人脸+刷卡", "status": "online", "last_access_time": "2026-05-29 13:03", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "device_no": "MK008", "device_name": "西门人行通道", "location": "西门", "device_type": "人脸+刷卡", "status": "online", "last_access_time": "2026-05-29 12:57", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "device_no": "MK009", "device_name": "地下车库入口", "location": "地库", "device_type": "车牌识别", "status": "online", "last_access_time": "2026-05-29 12:43", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "device_no": "MK010", "device_name": "快递柜区域门禁", "location": "快递区", "device_type": "刷卡", "status": "online", "last_access_time": "2026-05-29 12:52", "remark": null, "created_at": "2026-05-29 06:03:34"}], "access_records": [{"id": 1, "record_no": "TK20260529140301", "device_no": "MK001", "device_name": "1栋主入口门禁", "person_name": "甄子丹", "person_type": "住户", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-28 16:42", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "record_no": "TK20260529140302", "device_no": "MK002", "device_name": "1栋侧门门禁", "person_name": "李明华", "person_type": "物业人员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 00:08", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "record_no": "TK20260529140303", "device_no": "MK003", "device_name": "2栋主入口门禁", "person_name": "陈桂兰", "person_type": "住户", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 15:39", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "record_no": "TK20260529140304", "device_no": "MK004", "device_name": "3栋主入口门禁", "person_name": "访客王", "person_type": "快递员", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-29 08:17", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "record_no": "TK20260529140305", "device_no": "MK005", "device_name": "4栋主入口门禁", "person_name": "外卖员张", "person_type": "住户", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 18:06", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "record_no": "TK20260529140306", "device_no": "MK006", "device_name": "5栋主入口门禁", "person_name": "外卖员张", "person_type": "访客", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 04:33", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "record_no": "TK20260529140307", "device_no": "MK007", "device_name": "东门人行通道", "person_name": "迪丽热巴", "person_type": "外卖员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 05:19", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "record_no": "TK20260529140308", "device_no": "MK008", "device_name": "西门人行通道", "person_name": "外卖员张", "person_type": "访客", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-28 20:53", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "record_no": "TK20260529140309", "device_no": "MK009", "device_name": "地下车库入口", "person_name": "周润发", "person_type": "访客", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 21:53", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "record_no": "TK20260529140310", "device_no": "MK010", "device_name": "快递柜区域门禁", "person_name": "杨幂", "person_type": "访客", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 17:20", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "record_no": "TK20260529140311", "device_no": "MK001", "device_name": "1栋主入口门禁", "person_name": "快递员李", "person_type": "外卖员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 23:25", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "record_no": "TK20260529140312", "device_no": "MK002", "device_name": "1栋侧门门禁", "person_name": "刘德华", "person_type": "快递员", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-28 23:06", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 13, "record_no": "TK20260529140313", "device_no": "MK003", "device_name": "2栋主入口门禁", "person_name": "访客王", "person_type": "住户", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 13:56", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "record_no": "TK20260529140314", "device_no": "MK004", "device_name": "3栋主入口门禁", "person_name": "访客王", "person_type": "物业人员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 12:31", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 15, "record_no": "TK20260529140315", "device_no": "MK005", "device_name": "4栋主入口门禁", "person_name": "迪丽热巴", "person_type": "快递员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 15:40", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 16, "record_no": "TK20260529140316", "device_no": "MK006", "device_name": "5栋主入口门禁", "person_name": "访客王", "person_type": "住户", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 22:31", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 17, "record_no": "TK20260529140317", "device_no": "MK007", "device_name": "东门人行通道", "person_name": "赵丽颖", "person_type": "外卖员", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-29 08:56", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 18, "record_no": "TK20260529140318", "device_no": "MK008", "device_name": "西门人行通道", "person_name": "外卖员张", "person_type": "快递员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 04:10", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 19, "record_no": "TK20260529140319", "device_no": "MK009", "device_name": "地下车库入口", "person_name": "周润发", "person_type": "物业人员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 02:42", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 20, "record_no": "TK20260529140320", "device_no": "MK010", "device_name": "快递柜区域门禁", "person_name": "快递员李", "person_type": "访客", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 09:28", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 21, "record_no": "TK20260529140321", "device_no": "MK001", "device_name": "1栋主入口门禁", "person_name": "杨幂", "person_type": "住户", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 10:23", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 22, "record_no": "TK20260529140322", "device_no": "MK002", "device_name": "1栋侧门门禁", "person_name": "快递员李", "person_type": "访客", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-28 17:12", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 23, "record_no": "TK20260529140323", "device_no": "MK003", "device_name": "2栋主入口门禁", "person_name": "外卖员张", "person_type": "快递员", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-29 00:10", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 24, "record_no": "TK20260529140324", "device_no": "MK004", "device_name": "3栋主入口门禁", "person_name": "杨幂", "person_type": "物业人员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 10:33", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 25, "record_no": "TK20260529140325", "device_no": "MK005", "device_name": "4栋主入口门禁", "person_name": "范冰冰", "person_type": "快递员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 00:23", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 26, "record_no": "TK20260529140326", "device_no": "MK006", "device_name": "5栋主入口门禁", "person_name": "迪丽热巴", "person_type": "快递员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 02:46", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 27, "record_no": "TK20260529140327", "device_no": "MK007", "device_name": "东门人行通道", "person_name": "张秀英", "person_type": "住户", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 21:59", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 28, "record_no": "TK20260529140328", "device_no": "MK008", "device_name": "西门人行通道", "person_name": "外卖员张", "person_type": "快递员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-29 12:29", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 29, "record_no": "TK20260529140329", "device_no": "MK009", "device_name": "地下车库入口", "person_name": "外卖员张", "person_type": "外卖员", "access_type": "出门", "access_result": "允许", "access_time": "2026-05-28 14:27", "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 30, "record_no": "TK20260529140330", "device_no": "MK010", "device_name": "快递柜区域门禁", "person_name": "周润发", "person_type": "访客", "access_type": "进门", "access_result": "允许", "access_time": "2026-05-28 19:26", "remark": null, "created_at": "2026-05-29 06:03:34"}], "monitoring_points": [{"id": 1, "point_no": "JC001", "point_name": "1栋大厅监控", "location": "1栋大厅", "status": "online", "last_check_time": "2026-05-29 13:39", "alert_count": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "point_no": "JC002", "point_name": "1栋电梯监控", "location": "1栋电梯", "status": "online", "last_check_time": "2026-05-29 13:19", "alert_count": 5, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 3, "point_no": "JC003", "point_name": "2栋大厅监控", "location": "2栋大厅", "status": "online", "last_check_time": "2026-05-29 13:17", "alert_count": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 4, "point_no": "JC004", "point_name": "2栋电梯监控", "location": "2栋电梯", "status": "online", "last_check_time": "2026-05-29 13:20", "alert_count": 4, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "point_no": "JC005", "point_name": "3栋大厅监控", "location": "3栋大厅", "status": "online", "last_check_time": "2026-05-29 13:13", "alert_count": 5, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 6, "point_no": "JC006", "point_name": "小区广场监控", "location": "中心广场", "status": "online", "last_check_time": "2026-05-29 13:54", "alert_count": 0, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "point_no": "JC007", "point_name": "儿童游乐区监控", "location": "游乐区", "status": "online", "last_check_time": "2026-05-29 13:35", "alert_count": 4, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 8, "point_no": "JC008", "point_name": "东门入口监控", "location": "东门", "status": "offline", "last_check_time": "2026-05-29 13:57", "alert_count": 2, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 9, "point_no": "JC009", "point_name": "西门入口监控", "location": "西门", "status": "online", "last_check_time": "2026-05-29 13:18", "alert_count": 1, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 10, "point_no": "JC010", "point_name": "地下车库监控A", "location": "地库A区", "status": "online", "last_check_time": "2026-05-29 13:38", "alert_count": 3, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "point_no": "JC011", "point_name": "地下车库监控B", "location": "地库B区", "status": "online", "last_check_time": "2026-05-29 13:34", "alert_count": 1, "remark": null, "created_at": "2026-05-29 06:03:34"}, {"id": 12, "point_no": "JC012", "point_name": "垃圾分类点监控", "location": "垃圾分类区", "status": "online", "last_check_time": "2026-05-29 13:41", "alert_count": 4, "remark": null, "created_at": "2026-05-29 06:03:34"}], "alert_records": [{"id": 1, "alert_no": "GJ2026052901", "point_no": "JC001", "point_name": "1栋大厅监控", "alert_type": "异常徘徊", "alert_level": "low", "alert_desc": "1栋大厅监控检测到异常徘徊", "status": "confirmed", "handler_name": "李保安", "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 2, "alert_no": "GJ2026052902", "point_no": "JC002", "point_name": "1栋电梯监控", "alert_type": "烟雾报警", "alert_level": "low", "alert_desc": "1栋电梯监控检测到烟雾报警", "status": "handled", "handler_name": "张保安", "handle_result": "已联系住户确认", "handle_time": "2026-05-28 03:03", "created_at": "2026-05-29 06:03:34"}, {"id": 3, "alert_no": "GJ2026052903", "point_no": "JC003", "point_name": "2栋大厅监控", "alert_type": "烟雾报警", "alert_level": "medium", "alert_desc": "2栋大厅监控检测到烟雾报警", "status": "handled", "handler_name": "王队长", "handle_result": "已上门查看，无异常", "handle_time": "2026-05-27 19:03", "created_at": "2026-05-29 06:03:34"}, {"id": 4, "alert_no": "GJ2026052904", "point_no": "JC004", "point_name": "2栋电梯监控", "alert_type": "烟雾报警", "alert_level": "medium", "alert_desc": "2栋电梯监控检测到烟雾报警", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 5, "alert_no": "GJ2026052905", "point_no": "JC005", "point_name": "3栋大厅监控", "alert_type": "异常徘徊", "alert_level": "low", "alert_desc": "3栋大厅监控检测到异常徘徊", "status": "handled", "handler_name": "李保安", "handle_result": "已处理完毕", "handle_time": "2026-05-29 05:03", "created_at": "2026-05-29 06:03:34"}, {"id": 6, "alert_no": "GJ2026052906", "point_no": "JC006", "point_name": "小区广场监控", "alert_type": "异常徘徊", "alert_level": "medium", "alert_desc": "小区广场监控检测到异常徘徊", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 7, "alert_no": "GJ2026052907", "point_no": "JC007", "point_name": "儿童游乐区监控", "alert_type": "绊线检测", "alert_level": "low", "alert_desc": "儿童游乐区监控检测到绊线检测", "status": "handled", "handler_name": "李保安", "handle_result": "已联系住户确认", "handle_time": "2026-05-29 02:03", "created_at": "2026-05-29 06:03:34"}, {"id": 8, "alert_no": "GJ2026052908", "point_no": "JC008", "point_name": "东门入口监控", "alert_type": "异常徘徊", "alert_level": "high", "alert_desc": "东门入口监控检测到异常徘徊", "status": "handled", "handler_name": "李保安", "handle_result": "已联系住户确认", "handle_time": "2026-05-29 02:03", "created_at": "2026-05-29 06:03:34"}, {"id": 9, "alert_no": "GJ2026052909", "point_no": "JC009", "point_name": "西门入口监控", "alert_type": "绊线检测", "alert_level": "medium", "alert_desc": "西门入口监控检测到绊线检测", "status": "handled", "handler_name": "王队长", "handle_result": "已上门查看，无异常", "handle_time": "2026-05-28 16:03", "created_at": "2026-05-29 06:03:34"}, {"id": 10, "alert_no": "GJ2026052910", "point_no": "JC010", "point_name": "地下车库监控A", "alert_type": "绊线检测", "alert_level": "medium", "alert_desc": "地下车库监控A检测到绊线检测", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 11, "alert_no": "GJ2026052911", "point_no": "JC011", "point_name": "地下车库监控B", "alert_type": "绊线检测", "alert_level": "medium", "alert_desc": "地下车库监控B检测到绊线检测", "status": "handled", "handler_name": "张保安", "handle_result": "已联系住户确认", "handle_time": "2026-05-27 18:03", "created_at": "2026-05-29 06:03:34"}, {"id": 12, "alert_no": "GJ2026052912", "point_no": "JC012", "point_name": "垃圾分类点监控", "alert_type": "区域入侵", "alert_level": "high", "alert_desc": "垃圾分类点监控检测到区域入侵", "status": "handled", "handler_name": "李保安", "handle_result": "已处理完毕", "handle_time": "2026-05-27 22:03", "created_at": "2026-05-29 06:03:34"}, {"id": 13, "alert_no": "GJ2026052913", "point_no": "JC001", "point_name": "1栋大厅监控", "alert_type": "烟雾报警", "alert_level": "medium", "alert_desc": "1栋大厅监控检测到烟雾报警", "status": "pending", "handler_name": null, "handle_result": null, "handle_time": null, "created_at": "2026-05-29 06:03:34"}, {"id": 14, "alert_no": "GJ2026052914", "point_no": "JC002", "point_name": "1栋电梯监控", "alert_type": "异常徘徊", "alert_level": "low", "alert_desc": "1栋电梯监控检测到异常徘徊", "status": "handled", "handler_name": "张保安", "handle_result": "已处理完毕", "handle_time": "2026-05-28 12:03", "created_at": "2026-05-29 06:03:34"}, {"id": 15, "alert_no": "GJ2026052915", "point_no": "JC003", "point_name": "2栋大厅监控", "alert_type": "烟雾报警", "alert_level": "high", "alert_desc": "2栋大厅监控检测到烟雾报警", "status": "handled", "handler_name": "李保安", "handle_result": "已上门查看，无异常", "handle_time": "2026-05-28 12:03", "created_at": "2026-05-29 06:03:34"}],
  "canteen_gallery": [
    {"id": 1, "title": "明亮整洁的就餐区", "desc": "200㎡宽敞就餐空间，可同时容纳100人就餐", "icon": "🍽️", "bg": "#FFF7E6", "sort": 1, "created_at": "2026-05-29 06:03:34"},
    {"id": 2, "title": "明厨亮灶操作间", "desc": "全透明厨房，食材溯源、明码标价", "icon": "👨‍🍳", "bg": "#F6FFED", "sort": 2, "created_at": "2026-05-29 06:03:34"},
    {"id": 3, "title": "每日新鲜食材", "desc": "严格筛选供应商，当日配送，确保新鲜", "icon": "🥬", "bg": "#E6F7FF", "sort": 3, "created_at": "2026-05-29 06:03:34"},
    {"id": 4, "title": "营养均衡搭配", "desc": "专业营养师设计菜单，满足各年龄段需求", "icon": "🥗", "bg": "#FFF0F6", "sort": 4, "created_at": "2026-05-29 06:03:34"},
    {"id": 5, "title": "温馨包间服务", "desc": "提供家庭聚餐、生日宴会包间预订", "icon": "🎉", "bg": "#F9F0FF", "sort": 5, "created_at": "2026-05-29 06:03:34"},
    {"id": 6, "title": "便民早餐窗口", "desc": "每日6:30开始供应，包子馒头豆浆油条", "icon": "🥟", "bg": "#FFF1F0", "sort": 6, "created_at": "2026-05-29 06:03:34"}
  ],
  "canteen_menus": [
    {"id": 1, "menu_date": "2026-05-29", "meal_type": "breakfast", "dishes": "小米粥+肉包子+茶叶蛋+爽口小菜", "price": 8, "calories": "约380千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 2, "menu_date": "2026-05-29", "meal_type": "lunch", "dishes": "红烧肉+清蒸鲈鱼+番茄炒蛋+蒜蓉西兰花+紫菜蛋花汤", "price": 22, "calories": "约680千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 3, "menu_date": "2026-05-29", "meal_type": "dinner", "dishes": "糖醋排骨+麻婆豆腐+清炒时蔬+米饭+银耳汤", "price": 18, "calories": "约550千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 4, "menu_date": "2026-05-30", "meal_type": "breakfast", "dishes": "豆浆+油条+葱花饼+煮鸡蛋+凉拌黄瓜", "price": 7, "calories": "约420千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 5, "menu_date": "2026-05-30", "meal_type": "lunch", "dishes": "宫保鸡丁+回锅肉+蚝油生菜+酸辣土豆丝+冬瓜排骨汤", "price": 20, "calories": "约720千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 6, "menu_date": "2026-05-30", "meal_type": "dinner", "dishes": "可乐鸡翅+家常豆腐+白灼菜心+米饭+番茄蛋汤", "price": 18, "calories": "约580千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 7, "menu_date": "2026-05-31", "meal_type": "breakfast", "dishes": "皮蛋瘦肉粥+煎饺+煮鸡蛋+小咸菜", "price": 9, "calories": "约410千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 8, "menu_date": "2026-05-31", "meal_type": "lunch", "dishes": "水煮鱼+鱼香肉丝+干煸四季豆+凉拌木耳+菌菇汤", "price": 25, "calories": "约650千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 9, "menu_date": "2026-05-31", "meal_type": "dinner", "dishes": "红烧狮子头+地三鲜+上汤娃娃菜+米饭+绿豆汤", "price": 20, "calories": "约600千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 10, "menu_date": "2026-06-01", "meal_type": "breakfast", "dishes": "八宝粥+鲜肉包+卤蛋+凉拌海带丝", "price": 8, "calories": "约400千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 11, "menu_date": "2026-06-01", "meal_type": "lunch", "dishes": "梅菜扣肉+香辣虾+蒜蓉空心菜+醋溜白菜+海带排骨汤", "price": 24, "calories": "约700千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 12, "menu_date": "2026-06-01", "meal_type": "dinner", "dishes": "黄焖鸡块+虎皮青椒+清炒豆苗+米饭+南瓜汤", "price": 18, "calories": "约520千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 13, "menu_date": "2026-06-02", "meal_type": "breakfast", "dishes": "黑米粥+蒸饺+茶叶蛋+酸豆角", "price": 7, "calories": "约390千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 14, "menu_date": "2026-06-02", "meal_type": "lunch", "dishes": "红烧牛腩+椒盐排骨+手撕包菜+凉拌三丝+酸辣汤", "price": 25, "calories": "约750千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 15, "menu_date": "2026-06-02", "meal_type": "dinner", "dishes": "木须肉+干锅花菜+蚝油西兰花+米饭+紫菜汤", "price": 18, "calories": "约560千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 16, "menu_date": "2026-06-03", "meal_type": "breakfast", "dishes": "绿豆粥+煎包+五香蛋+凉拌木耳", "price": 8, "calories": "约410千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 17, "menu_date": "2026-06-03", "meal_type": "lunch", "dishes": "粉蒸肉+剁椒鱼头+清炒莴笋+蒜泥茄子+番茄豆腐汤", "price": 23, "calories": "约690千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 18, "menu_date": "2026-06-03", "meal_type": "dinner", "dishes": "啤酒鸭+酸辣藕丁+白灼生菜+米饭+玉米排骨汤", "price": 20, "calories": "约610千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 19, "menu_date": "2026-06-04", "meal_type": "breakfast", "dishes": "南瓜粥+花卷+煮鸡蛋+腌萝卜", "price": 6, "calories": "约360千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 20, "menu_date": "2026-06-04", "meal_type": "lunch", "dishes": "东坡肉+蒜蓉粉丝蒸虾+干煸豆角+西芹百合+虫草花鸡汤", "price": 26, "calories": "约730千卡", "status": "available", "created_at": "2026-05-29 06:03:34"},
    {"id": 21, "menu_date": "2026-06-04", "meal_type": "dinner", "dishes": "小炒黄牛肉+西葫芦炒蛋+上汤菠菜+米饭+红豆汤", "price": 19, "calories": "约560千卡", "status": "available", "created_at": "2026-05-29 06:03:34"}
  ],
  "community_doctors": [
    {"id": 1, "name": "张慧敏", "title": "全科主任医师", "dept": "全科医学科", "hospital": "碧水社区卫生服务站", "avatar": "👩‍⚕️", "phone": "138****5678", "specialties": "高血压、糖尿病、冠心病等慢性病管理", "experience": "20年", "bio": "从事社区全科医疗工作20年，擅长老年人慢性病综合管理，在健康评估和慢病干预方面经验丰富。", "signing_count": 326, "rating": 4.9, "status": "active", "work_time": "周一至周五 8:00-17:00", "created_at": "2026-05-01 08:00:00"},
    {"id": 2, "name": "李明辉", "title": "中医副主任医师", "dept": "中医科", "hospital": "翠湖社区卫生服务中心", "avatar": "🧑‍⚕️", "phone": "139****3456", "specialties": "中医体质调理、针灸推拿、慢性疼痛管理", "experience": "15年", "bio": "毕业于北京中医药大学，擅长运用中医理论进行体质辨识和个性化调理方案制定。", "signing_count": 258, "rating": 4.8, "status": "active", "work_time": "周一至周六 8:30-17:30", "created_at": "2026-05-01 08:00:00"},
    {"id": 3, "name": "王丽华", "title": "儿科主治医师", "dept": "儿科", "hospital": "幸福里社区卫生服务站", "avatar": "👩‍⚕️", "phone": "137****7890", "specialties": "儿童生长发育评估、疫苗接种咨询、常见儿科疾病", "experience": "12年", "bio": "在三甲医院儿科工作8年后转入社区医疗，专注儿童健康管理及家庭医生签约服务。", "signing_count": 189, "rating": 4.9, "status": "active", "work_time": "周一至周五 9:00-18:00", "created_at": "2026-05-01 08:00:00"},
    {"id": 4, "name": "陈建国", "title": "内科副主任医师", "dept": "内科", "hospital": "碧水社区卫生服务站", "avatar": "👨‍⚕️", "phone": "136****0123", "specialties": "心脑血管疾病、呼吸系统疾病、老年人综合评估", "experience": "18年", "bio": "长期从事社区内科诊疗工作，在心脑血管疾病早期筛查和干预方面有丰富经验。", "signing_count": 312, "rating": 4.7, "status": "active", "work_time": "周一至周五 8:00-16:00", "created_at": "2026-05-01 08:00:00"},
    {"id": 5, "name": "赵医生", "title": "健康管理师", "dept": "健康管理科", "hospital": "怡景苑健康管理中心", "avatar": "🏥", "phone": "135****4567", "specialties": "健康档案管理、营养指导、运动处方", "experience": "8年", "bio": "国家高级健康管理师，专注社区居民健康档案管理和个性化健康计划制定。", "signing_count": 145, "rating": 4.6, "status": "active", "work_time": "周一至周五 8:30-17:00", "created_at": "2026-05-01 08:00:00"}
  ],
  "doctor_signings": [
    {"id": 1, "resident_name": "李明华", "resident_phone": "138****6789", "resident_id_card": "4301**********1234", "address": "碧水园3栋2单元1501", "doctor_id": 1, "doctor_name": "张慧敏", "signing_date": "2026-03-15", "valid_from": "2026-03-15", "valid_until": "2027-03-14", "status": "active", "service_package": "基础包", "remark": "", "created_at": "2026-03-15 09:30:00"},
    {"id": 2, "resident_name": "王建国", "resident_phone": "139****2234", "resident_id_card": "4301**********5678", "address": "翠湖居5栋1单元802", "doctor_id": 2, "doctor_name": "李明辉", "signing_date": "2026-02-20", "valid_from": "2026-02-20", "valid_until": "2027-02-19", "status": "active", "service_package": "升级包", "remark": "高血压患者，需定期随访", "created_at": "2026-02-20 14:00:00"},
    {"id": 3, "resident_name": "张秀英", "resident_phone": "136****8876", "resident_id_card": "4301**********9012", "address": "怡景苑7栋3单元1102", "doctor_id": 1, "doctor_name": "张慧敏", "signing_date": "2026-04-01", "valid_from": "2026-04-01", "valid_until": "2027-03-31", "status": "active", "service_package": "基础包", "remark": "", "created_at": "2026-04-01 10:00:00"},
    {"id": 4, "resident_name": "刘德华", "resident_phone": "137****9988", "resident_id_card": "4301**********3456", "address": "幸福里2栋1单元501", "doctor_id": 4, "doctor_name": "陈建国", "signing_date": "2026-01-10", "valid_from": "2026-01-10", "valid_until": "2026-07-09", "status": "pending_renewal", "service_package": "升级包", "remark": "冠心病史，即将到期需续签", "created_at": "2026-01-10 11:00:00"},
    {"id": 5, "resident_name": "陈桂兰", "resident_phone": "135****4532", "resident_id_card": "4301**********7890", "address": "幸福里2栋1单元501", "doctor_id": 3, "doctor_name": "王丽华", "signing_date": "2026-05-15", "valid_from": "2026-05-15", "valid_until": "2027-05-14", "status": "active", "service_package": "基础包", "remark": "为家中儿童签约", "created_at": "2026-05-15 15:30:00"}
  ],
  "doctor_followups": [
    {"id": 1, "signing_id": 2, "doctor_id": 2, "doctor_name": "李明辉", "resident_name": "王建国", "followup_date": "2026-05-20", "followup_type": "regular", "followup_type_name": "常规随访", "content": "血压测量：145/90mmHg，较上次略有升高。建议：1.规律服药 2.低盐饮食 3.每周至少3次30分钟以上中等强度运动", "assessment": "血压控制欠佳，需加强干预", "next_followup": "2026-06-20", "status": "completed", "created_at": "2026-05-20 14:30:00"},
    {"id": 2, "signing_id": 1, "doctor_id": 1, "doctor_name": "张慧敏", "resident_name": "李明华", "followup_date": "2026-05-22", "followup_type": "phone", "followup_type_name": "电话随访", "content": "电话沟通了解近期身体状况，自述无不适。提醒定期体检和健康生活方式。", "assessment": "健康状况良好", "next_followup": "2026-08-22", "status": "completed", "created_at": "2026-05-22 10:00:00"},
    {"id": 3, "signing_id": 2, "doctor_id": 2, "doctor_name": "李明辉", "resident_name": "王建国", "followup_date": "2026-06-20", "followup_type": "regular", "followup_type_name": "常规随访", "content": "", "assessment": "", "next_followup": "2026-09-20", "status": "pending", "created_at": "2026-05-22 10:05:00"},
    {"id": 4, "signing_id": 4, "doctor_id": 4, "doctor_name": "陈建国", "resident_name": "刘德华", "followup_date": "2026-05-18", "followup_type": "home", "followup_type_name": "上门随访", "content": "上门进行心脏听诊和心电图检查，心率正常，建议继续服用阿司匹林和他汀类药物。家属需注意观察是否有胸闷胸痛症状。", "assessment": "冠心病稳定期，定期复查即可", "next_followup": "2026-07-18", "status": "completed", "created_at": "2026-05-18 09:00:00"},
    {"id": 5, "signing_id": 1, "doctor_id": 1, "doctor_name": "张慧敏", "resident_name": "李明华", "followup_date": "2026-08-22", "followup_type": "regular", "followup_type_name": "常规随访", "content": "", "assessment": "", "next_followup": "2026-11-22", "status": "pending", "created_at": "2026-05-22 10:06:00"}
  ],
  "health_assessments": [
    {"id": 1, "signing_id": 1, "doctor_id": 1, "doctor_name": "张慧敏", "resident_name": "李明华", "assessment_date": "2026-03-20", "blood_pressure": "125/82", "heart_rate": 72, "blood_sugar": 5.2, "weight": 68, "height": 172, "bmi": 23.0, "assessment_result": "健康", "risk_level": "低", "summary": "各项指标均在正常范围，健康状况良好。建议保持规律作息和适量运动。", "next_assessment": "2027-03-20", "created_at": "2026-03-20 09:00:00"},
    {"id": 2, "signing_id": 2, "doctor_id": 2, "doctor_name": "李明辉", "resident_name": "王建国", "assessment_date": "2026-03-01", "blood_pressure": "150/95", "heart_rate": 78, "blood_sugar": 6.8, "weight": 82, "height": 175, "bmi": 26.8, "assessment_result": "异常", "risk_level": "中", "summary": "血压偏高（高血压1级），空腹血糖偏高（糖尿病前期），BMI超重。需重点管理：1.降压治疗 2.血糖监测 3.减重计划", "next_assessment": "2026-09-01", "created_at": "2026-03-01 10:30:00"},
    {"id": 3, "signing_id": 4, "doctor_id": 4, "doctor_name": "陈建国", "resident_name": "刘德华", "assessment_date": "2026-04-10", "blood_pressure": "138/85", "heart_rate": 65, "blood_sugar": 5.8, "weight": 75, "height": 178, "bmi": 23.7, "assessment_result": "关注", "risk_level": "中", "summary": "血压偏高值，有冠心病史。建议：1.规律服药 2.低脂低盐饮食 3.定期心脏检查", "next_assessment": "2026-10-10", "created_at": "2026-04-10 11:00:00"},
    {"id": 4, "signing_id": 3, "doctor_id": 1, "doctor_name": "张慧敏", "resident_name": "张秀英", "assessment_date": "2026-04-15", "blood_pressure": "118/75", "heart_rate": 70, "blood_sugar": 5.0, "weight": 58, "height": 162, "bmi": 22.1, "assessment_result": "健康", "risk_level": "低", "summary": "各项指标正常，建议每年进行一次全面体检。", "next_assessment": "2027-04-15", "created_at": "2026-04-15 14:00:00"}
  ],
  "health_alerts": [
    {"id": 1, "signing_id": 2, "doctor_id": 2, "doctor_name": "李明辉", "resident_name": "王建国", "alert_type": "血压超标", "alert_level": "warning", "alert_level_name": "⚠️ 预警", "measurement": "血压 150/95 mmHg", "threshold": "正常范围 <140/90", "alert_time": "2026-05-29 07:30:00", "status": "pending", "handled_by": null, "handled_time": null, "handled_note": null, "created_at": "2026-05-29 07:30:00"},
    {"id": 2, "signing_id": 4, "doctor_id": 4, "doctor_name": "陈建国", "resident_name": "刘德华", "alert_type": "心率异常", "alert_level": "danger", "alert_level_name": "🔴 高危", "measurement": "静息心率 110 次/分", "threshold": "正常范围 60-100 次/分", "alert_time": "2026-05-28 22:15:00", "status": "handled", "handled_by": "陈建国", "handled_time": "2026-05-28 22:30:00", "handled_note": "电话联系居民，已自行缓解，建议明天来门诊复查", "created_at": "2026-05-28 22:15:00"},
    {"id": 3, "signing_id": 2, "doctor_id": 2, "doctor_name": "李明辉", "resident_name": "王建国", "alert_type": "血糖超标", "alert_level": "warning", "alert_level_name": "⚠️ 预警", "measurement": "空腹血糖 7.2 mmol/L", "threshold": "正常范围 3.9-6.1 mmol/L", "alert_time": "2026-05-28 06:45:00", "status": "pending", "handled_by": null, "handled_time": null, "handled_note": null, "created_at": "2026-05-28 06:45:00"}
  ],
  "doctor_consultations": [
    {"id": 1, "signing_id": 2, "doctor_id": 2, "doctor_name": "李明辉", "resident_name": "王建国", "consult_date": "2026-05-25", "consult_time": "14:30", "consult_type": "online", "consult_type_name": "在线问诊", "symptom": "最近一周头晕、偶尔胸闷，血压测量偏高", "doctor_reply": "根据您的描述和血压数据，建议：1.保持规律服药 2.每天早晚各测一次血压并记录 3.减少盐摄入 4.如胸闷加重及时就医。下周安排一次面诊。", "status": "replied", "created_at": "2026-05-25 14:30:00", "replied_at": "2026-05-25 15:45:00"},
    {"id": 2, "signing_id": 1, "doctor_id": 1, "doctor_name": "张慧敏", "resident_name": "李明华", "consult_date": "2026-05-28", "consult_time": "09:00", "consult_type": "online", "consult_type_name": "在线问诊", "symptom": "最近睡眠不好，是否需要吃药调理", "doctor_reply": null, "status": "pending", "created_at": "2026-05-28 09:00:00", "replied_at": null},
    {"id": 3, "signing_id": 4, "doctor_id": 4, "doctor_name": "陈建国", "resident_name": "刘德华", "consult_date": "2026-05-26", "consult_time": "16:00", "consult_type": "phone", "consult_type_name": "电话问诊", "symptom": "近期服药后胃部不适，询问是否可以调整用药时间", "doctor_reply": "建议饭后半小时服用，可以减轻胃部刺激。如果仍有不适，下周门诊可以调整药物方案。", "status": "replied", "created_at": "2026-05-26 16:00:00", "replied_at": "2026-05-26 16:20:00"}
  ]
  };

    // 初始化：从 localStorage 加载或从 MOCK_DATA 初始化
    const DB_KEY = 'smart_community_db';
    let db = null;

    function initDB() {
        const stored = localStorage.getItem(DB_KEY);
        if (stored) {
            try { db = JSON.parse(stored); return; } catch(e) {}
        }
        // 首次加载，深拷贝 mock 数据
        db = JSON.parse(JSON.stringify(MOCK_DATA));
        // 移除 sqlite_sequence
        delete db['sqlite_sequence'];
        saveDB();
    }

    function saveDB() {
        try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch(e) {}
    }

    function getTable(name) {
        if (!db[name]) db[name] = [];
        return db[name];
    }

    function nextId(table) {
        const t = getTable(table);
        if (t.length === 0) return 1;
        return Math.max(...t.map(r => r.id || 0)) + 1;
    }

    function genOrderNo(prefix) {
        const now = new Date();
        const ts = now.getFullYear().toString() +
            String(now.getMonth()+1).padStart(2,'0') +
            String(now.getDate()).padStart(2,'0') +
            String(now.getHours()).padStart(2,'0') +
            String(now.getMinutes()).padStart(2,'0') +
            String(now.getSeconds()).padStart(2,'0') +
            String(Math.floor(Math.random()*1000)).padStart(3,'0');
        return prefix + ts;
    }

    function filterByStatus(rows, status) {
        if (!status) return rows;
        return rows.filter(r => r.status === status);
    }

    function filterByType(rows, field, val) {
        if (!val) return rows;
        return rows.filter(r => r[field] === val);
    }

    // ============ 路由处理 ============
    function handleAPI(pathname, method, body, queryParams) {
        const p = pathname;

        // --- 统计仪表盘 ---
        if (p === '/api/stats' && method === 'GET') {
            return getStats();
        }
        if (p === '/api/stats/snapshot' && method === 'GET') {
            return getSnapshot();
        }

        // --- 家政服务 ---
        if (p === '/api/housekeeping/orders' && method === 'GET') {
            let rows = getTable('housekeeping_orders');
            const status = queryParams.get('status');
            rows = filterByStatus(rows, status);
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            if (!status) rows = rows.slice(0, 10);
            return {code: 0, data: rows};
        }
        if (p === '/api/housekeeping/orders/all' && method === 'GET') {
            let rows = getTable('housekeeping_orders');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/housekeeping/orders' && method === 'POST') {
            const data = body;
            const orders = getTable('housekeeping_orders');
            const newOrder = {
                id: nextId('housekeeping_orders'),
                order_no: genOrderNo('HK'),
                service_type: data.service_type || '',
                service_type_name: data.service_type_name || '',
                book_date: data.book_date || '',
                book_time: data.book_time || '',
                contact_name: data.contact_name || '',
                contact_phone: data.contact_phone || '',
                address: data.address || '',
                area: data.area || '',
                remark: data.remark || '',
                amount: data.amount || 0,
                status: 'pending',
                staff_id: null,
                staff_name: null,
                created_at: new Date().toISOString(),
                completed_at: null,
                rating: null,
                review: null
            };
            orders.push(newOrder);
            saveDB();
            return {code: 0, data: {id: newOrder.id, order_no: newOrder.order_no}, message: '订单创建成功'};
        }
        if (p.match(/^\/api\/housekeeping\/orders\/(\d+)\/accept$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const orders = getTable('housekeeping_orders');
            const order = orders.find(o => o.id === id);
            if (order) {
                order.status = 'accepted';
                order.staff_id = body.staff_id;
                order.staff_name = body.staff_name;
                saveDB();
            }
            return {code: 0, message: '已接单'};
        }
        if (p.match(/^\/api\/housekeeping\/orders\/(\d+)\/process$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const orders = getTable('housekeeping_orders');
            const order = orders.find(o => o.id === id);
            if (order) { order.status = 'processing'; saveDB(); }
            return {code: 0, message: '服务已开始'};
        }
        if (p.match(/^\/api\/housekeeping\/orders\/(\d+)\/complete$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const orders = getTable('housekeeping_orders');
            const order = orders.find(o => o.id === id);
            if (order) { order.status = 'completed'; order.completed_at = new Date().toISOString(); saveDB(); }
            return {code: 0, message: '已完成'};
        }
        if (p.match(/^\/api\/housekeeping\/orders\/(\d+)\/review$/) && method === 'POST') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const orders = getTable('housekeeping_orders');
            const order = orders.find(o => o.id === id);
            if (order) { order.rating = body.rating; order.review = body.review; saveDB(); }
            return {code: 0, message: '评价成功'};
        }
        if (p === '/api/housekeeping/staff' && method === 'GET') {
            return {code: 0, data: getTable('service_staff')};
        }

        // --- 食堂管理 ---
        if (p === '/api/canteen/dishes' && method === 'GET') {
            const cat = queryParams.get('category');
            let rows = getTable('canteen_dishes');
            if (cat) rows = rows.filter(r => r.category === cat);
            return {code: 0, data: rows};
        }
        if (p === '/api/canteen/dishes' && method === 'POST') {
            const dishes = getTable('canteen_dishes');
            const d = body;
            dishes.push({
                id: nextId('canteen_dishes'),
                name: d.name, category: d.category, price: d.price,
                unit: d.unit || '份', nutrition_info: null, today_sales: 0,
                status: 'available', image: null, created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: dishes[dishes.length-1].id}, message: '添加成功'};
        }
        if (p.match(/^\/api\/canteen\/dishes\/(\d+)$/) && method === 'DELETE') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            db.canteen_dishes = getTable('canteen_dishes').filter(d => d.id !== id);
            saveDB();
            return {code: 0, message: '删除成功'};
        }
        if (p.match(/^\/api\/canteen\/dishes\/(\d+)$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const dish = getTable('canteen_dishes').find(d => d.id === id);
            if (dish) { Object.assign(dish, body); saveDB(); }
            return {code: 0, message: '更新成功'};
        }
        if (p === '/api/canteen/orders' && method === 'GET') {
            let rows = getTable('canteen_orders');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            if (!queryParams.get('status')) rows = rows.slice(0, 10);
            return {code: 0, data: rows};
        }
        if (p === '/api/canteen/orders/all' && method === 'GET') {
            let rows = getTable('canteen_orders');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/canteen/orders' && method === 'POST') {
            const orders = getTable('canteen_orders');
            const d = body;
            const no = genOrderNo('CT');
            const newOrder = {
                id: nextId('canteen_orders'), order_no: no,
                customer_name: d.customer_name || '匿名',
                customer_phone: d.customer_phone || '',
                dishes: typeof d.dishes === 'string' ? d.dishes : JSON.stringify(d.dishes),
                meal_type: d.meal_type || 'lunch',
                amount: d.amount || 0,
                status: 'pending',
                created_at: new Date().toISOString(),
                completed_at: null, remark: d.remark || ''
            };
            orders.push(newOrder);
            saveDB();
            return {code: 0, data: {id: newOrder.id, order_no: no}, message: '下单成功'};
        }
        if (p.match(/^\/api\/canteen\/orders\/(\d+)\/accept$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const order = getTable('canteen_orders').find(o => o.id === id);
            if (order) { order.status = 'accepted'; saveDB(); }
            return {code: 0, message: '已确认'};
        }
        if (p.match(/^\/api\/canteen\/orders\/(\d+)\/complete$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const order = getTable('canteen_orders').find(o => o.id === id);
            if (order) { order.status = 'completed'; order.completed_at = new Date().toISOString(); saveDB(); }
            return {code: 0, message: '已完成'};
        }
        
        // --- 食堂风采 & 每日菜单 ---
        if (p === '/api/canteen/gallery' && method === 'GET') {
            let rows = getTable('canteen_gallery');
            rows.sort((a,b) => (a.sort||0) - (b.sort||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/canteen/menus' && method === 'GET') {
            let rows = getTable('canteen_menus');
            const date = queryParams.get('date');
            const meal = queryParams.get('meal_type');
            if (date) rows = rows.filter(r => r.menu_date === date);
            if (meal) rows = rows.filter(r => r.meal_type === meal);
            rows.sort((a,b) => a.id - b.id);
            return {code: 0, data: rows};
        }
        if (p === '/api/canteen/menus' && method === 'POST') {
            const menus = getTable('canteen_menus');
            const d = body;
            menus.push({
                id: nextId('canteen_menus'),
                menu_date: d.menu_date, meal_type: d.meal_type,
                dishes: d.dishes, price: d.price || 0,
                calories: d.calories || '', status: 'available',
                created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: menus[menus.length-1].id}, message: '添加成功'};
        }
        if (p.match(/^\/api\/canteen\/menus\/(\d+)$/) && method === 'DELETE') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            db.canteen_menus = getTable('canteen_menus').filter(m => m.id !== id);
            saveDB();
            return {code: 0, message: '删除成功'};
        }

        // --- 食堂风采 POST / DELETE ---
        if (p === '/api/canteen/gallery' && method === 'POST') {
            const gallery = getTable('canteen_gallery');
            const d = body;
            // edit mode: if there's an id and it exists, update it
            if (d.id) {
                const idx = gallery.findIndex(g => g.id === d.id);
                if (idx >= 0) {
                    gallery[idx] = {...gallery[idx], ...d};
                    saveDB();
                    return {code: 0, data: {id: d.id}, message: '修改成功'};
                }
            }
            // add mode
            const newItem = {
                id: nextId('canteen_gallery'),
                title: d.title, desc: d.desc || '',
                icon: d.icon || '🍽️', bg: d.bg || '#FFF7E6',
                sort: d.sort || gallery.length + 1,
                created_at: new Date().toISOString()
            };
            gallery.push(newItem);
            saveDB();
            return {code: 0, data: {id: newItem.id}, message: '添加成功'};
        }
        if (p.match(/^\/api\/canteen\/gallery\/(\d+)$/) && method === 'DELETE') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            db.canteen_gallery = getTable('canteen_gallery').filter(g => g.id !== id);
            saveDB();
            return {code: 0, message: '删除成功'};
        }

        if (p === '/api/canteen/ingredients' && method === 'GET') {
            return {code: 0, data: getTable('ingredients')};
        }

        // --- 物业缴费 ---
        if (p === '/api/property/fees' && method === 'GET') {
            let rows = getTable('property_fees');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows = filterByType(rows, 'fee_type', queryParams.get('fee_type'));
            return {code: 0, data: rows};
        }
        if (p === '/api/property/fees' && method === 'POST') {
            const fees = getTable('property_fees');
            const d = body;
            fees.push({
                id: nextId('property_fees'), fee_no: genOrderNo('FY'),
                resident_name: d.resident_name || '', resident_phone: d.resident_phone || '',
                building: d.building || '', unit: d.unit || '', room_no: d.room_no || '',
                fee_type: d.fee_type || '', fee_period: d.fee_period || '',
                amount: d.amount || 0, paid_amount: 0, status: 'unpaid',
                due_date: d.due_date || '', paid_date: null,
                payment_method: null, remark: d.remark || '', created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: fees[fees.length-1].id}, message: '创建成功'};
        }
        if (p.match(/^\/api\/property\/fees\/(\d+)\/pay$/) && method === 'POST') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const fee = getTable('property_fees').find(f => f.id === id);
            if (fee) {
                fee.status = 'paid'; fee.paid_amount = fee.amount;
                fee.paid_date = new Date().toISOString().split('T')[0];
                fee.payment_method = body.payment_method || '在线支付';
                saveDB();
            }
            return {code: 0, message: '缴费成功'};
        }

        // --- 报修管理 ---
        if (p === '/api/repair/orders' && method === 'GET') {
            let rows = getTable('repair_orders');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            if (!queryParams.get('status')) rows = rows.slice(0, 10);
            return {code: 0, data: rows};
        }
        if (p === '/api/repair/orders' && method === 'POST') {
            const orders = getTable('repair_orders');
            const d = body;
            orders.push({
                id: nextId('repair_orders'), order_no: genOrderNo('RP'),
                resident_name: d.resident_name || '', resident_phone: d.resident_phone || '',
                building: d.building || '', unit: d.unit || '', room_no: d.room_no || '',
                repair_type: d.repair_type || '', repair_desc: d.repair_desc || '',
                urgency: d.urgency || 'normal', status: 'pending',
                assignee_id: null, assignee_name: null, appointment_time: null,
                completed_at: null, rating: null, review: null, created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: orders[orders.length-1].id, order_no: orders[orders.length-1].order_no}, message: '报修提交成功'};
        }
        if (p.match(/^\/api\/repair\/orders\/(\d+)\/assign$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const order = getTable('repair_orders').find(o => o.id === id);
            if (order) {
                order.status = 'assigned'; order.assignee_id = body.assignee_id;
                order.assignee_name = body.assignee_name;
                order.appointment_time = body.appointment_time;
                saveDB();
            }
            return {code: 0, message: '派单成功'};
        }
        if (p.match(/^\/api\/repair\/orders\/(\d+)\/process$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const order = getTable('repair_orders').find(o => o.id === id);
            if (order) { order.status = 'processing'; saveDB(); }
            return {code: 0, message: '维修已开始'};
        }
        if (p.match(/^\/api\/repair\/orders\/(\d+)\/complete$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const order = getTable('repair_orders').find(o => o.id === id);
            if (order) { order.status = 'completed'; order.completed_at = new Date().toISOString(); saveDB(); }
            return {code: 0, message: '维修完成'};
        }
        if (p.match(/^\/api\/repair\/orders\/(\d+)\/review$/) && method === 'POST') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const order = getTable('repair_orders').find(o => o.id === id);
            if (order) { order.rating = body.rating; order.review = body.review; saveDB(); }
            return {code: 0, message: '评价成功'};
        }

        // --- 访客管理 ---
        if (p === '/api/visitor/records' && method === 'GET') {
            let rows = getTable('visitor_records');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/visitor/records' && method === 'POST') {
            const records = getTable('visitor_records');
            const d = body;
            records.push({
                id: nextId('visitor_records'), visitor_name: d.visitor_name || '',
                visitor_phone: d.visitor_phone || '', visitor_id_no: d.visitor_id_no || '',
                visited_building: d.visited_building || '', visited_unit: d.visited_unit || '',
                visited_room: d.visited_room || '', visited_resident: d.visited_resident || '',
                visit_purpose: d.visit_purpose || '',
                entry_time: new Date().toISOString(), exit_time: null,
                status: 'inside', remark: d.remark || '', created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: records[records.length-1].id}, message: '访客登记成功'};
        }
        if (p.match(/^\/api\/visitor\/records\/(\d+)\/exit$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const record = getTable('visitor_records').find(r => r.id === id);
            if (record) { record.status = 'exited'; record.exit_time = new Date().toISOString(); saveDB(); }
            return {code: 0, message: '已登记离开'};
        }

        // --- 公告通知 ---
        if (p === '/api/announcements' && method === 'GET') {
            return {code: 0, data: getTable('announcements').sort((a,b) => (b.id||0)-(a.id||0))};
        }
        if (p === '/api/announcements' && method === 'POST') {
            const anns = getTable('announcements');
            const d = body;
            anns.push({
                id: nextId('announcements'), title: d.title, content: d.content || '',
                category: d.category || 'normal', is_top: d.is_top || 0, is_urgent: d.is_urgent || 0,
                publisher: d.publisher || '管理员', view_count: 0,
                status: 'published', published_at: new Date().toISOString(),
                created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: anns[anns.length-1].id}, message: '发布成功'};
        }
        if (p.match(/^\/api\/announcements\/(\d+)$/) && method === 'DELETE') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            db.announcements = getTable('announcements').filter(a => a.id !== id);
            saveDB();
            return {code: 0, message: '删除成功'};
        }
        if (p.match(/^\/api\/announcements\/(\d+)$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const a = getTable('announcements').find(x => x.id === id);
            if (a) { Object.assign(a, body); saveDB(); }
            return {code: 0, message: '更新成功'};
        }

        // --- 车位管理 ---
        if (p === '/api/parking/spaces' && method === 'GET') {
            let rows = getTable('parking_spaces');
            rows = filterByStatus(rows, queryParams.get('status'));
            return {code: 0, data: rows};
        }
        if (p === '/api/parking/spaces' && method === 'POST') {
            const spaces = getTable('parking_spaces');
            const d = body;
            spaces.push({
                id: nextId('parking_spaces'), space_no: d.space_no, area: d.area || '',
                space_type: d.space_type || 'normal', status: 'available',
                plate_no: null, resident_name: null, resident_phone: null,
                monthly_fee: 300, card_start_date: null, card_end_date: null,
                remark: d.remark || '', created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: spaces[spaces.length-1].id}, message: '添加成功'};
        }
        if (p.match(/^\/api\/parking\/spaces\/(\d+)$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const sp = getTable('parking_spaces').find(s => s.id === id);
            if (sp) { Object.assign(sp, body); saveDB(); }
            return {code: 0, message: '更新成功'};
        }
        if (p === '/api/parking/records' && method === 'GET') {
            return {code: 0, data: getTable('parking_records').sort((a,b) => (b.id||0)-(a.id||0))};
        }

        // --- 康养服务 ---
        if (p === '/api/health/records' && method === 'GET') {
            let rows = getTable('health_records');
            if (queryParams.get('record_type')) rows = rows.filter(r => r.record_type === queryParams.get('record_type'));
            rows.sort((a,b) => (b.id||0)-(a.id||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/health/records' && method === 'POST') {
            const records = getTable('health_records');
            const d = body;
            records.push({
                id: nextId('health_records'), resident_name: d.resident_name || '',
                resident_phone: d.resident_phone || '', building: d.building || '',
                room_no: d.room_no || '', record_type: d.record_type || '',
                record_value: d.record_value || '', record_time: d.record_time || new Date().toISOString(),
                is_abnormal: d.is_abnormal || 0, remark: d.remark || '', created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: records[records.length-1].id}, message: '记录添加成功'};
        }
        if (p === '/api/care/plans' && method === 'GET') {
            let rows = getTable('care_plans');
            rows = filterByStatus(rows, queryParams.get('status'));
            return {code: 0, data: rows};
        }
        if (p === '/api/care/plans' && method === 'POST') {
            const plans = getTable('care_plans');
            const d = body;
            plans.push({
                id: nextId('care_plans'), plan_no: genOrderNo('CP'),
                resident_name: d.resident_name || '', resident_phone: d.resident_phone || '',
                building: d.building || '', room_no: d.room_no || '',
                care_type: d.care_type || '', care_content: d.care_content || '',
                frequency: d.frequency || '', start_date: d.start_date || '', end_date: d.end_date || '',
                assignee_id: null, assignee_name: null, status: 'active', created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: plans[plans.length-1].id}, message: '计划创建成功'};
        }
        if (p.match(/^\/api\/care\/plans\/(\d+)$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const plan = getTable('care_plans').find(x => x.id === id);
            if (plan) { Object.assign(plan, body); saveDB(); }
            return {code: 0, message: '更新成功'};
        }
        if (p === '/api/sos/records' && method === 'GET') {
            let rows = getTable('sos_records');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0)-(a.id||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/sos/records' && method === 'POST') {
            const records = getTable('sos_records');
            const d = body;
            records.push({
                id: nextId('sos_records'), sos_no: genOrderNo('SOS'),
                resident_name: d.resident_name || '', resident_phone: d.resident_phone || '',
                sos_location: d.sos_location || '', sos_reason: d.sos_reason || '',
                urgency: d.urgency || 'high', status: 'pending',
                handler_name: null, handle_result: null, handle_time: null, created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: records[records.length-1].id}, message: 'SOS已发出'};
        }
        if (p === '/api/sos/alert' && method === 'POST') {
            const records = getTable('sos_records');
            const d = body;
            records.push({
                id: nextId('sos_records'), sos_no: genOrderNo('SOS'),
                resident_name: d.resident_name || '李明华', resident_phone: d.resident_phone || '138****6789',
                sos_location: d.sos_location || '碧水园3栋2单元1501',
                sos_reason: d.sos_reason || d.message || '紧急求助',
                urgency: d.urgency || 'high', status: 'pending',
                handler_name: null, handle_result: null, handle_time: null, created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: records[records.length-1].id, sos_no: records[records.length-1].sos_no}, message: 'SOS求助已发送，工作人员将尽快响应'};
        }
        if (p.match(/^\/api\/sos\/records\/(\d+)\/handle$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const sos = getTable('sos_records').find(r => r.id === id);
            if (sos) {
                sos.status = 'handled';
                sos.handler_name = body.handler_name || '管理员';
                sos.handle_result = body.handle_result || '已处理';
                sos.handle_time = new Date().toISOString();
                saveDB();
            }
            return {code: 0, message: '处理完成'};
        }

        // --- 社区活动 ---
        if (p === '/api/activities' && method === 'GET') {
            return {code: 0, data: getTable('activities').sort((a,b) => (b.id||0)-(a.id||0))};
        }
        if (p === '/api/activities' && method === 'POST') {
            const acts = getTable('activities');
            const d = body;
            acts.push({
                id: nextId('activities'), activity_no: genOrderNo('ACT'),
                title: d.title, content: d.content || '', activity_type: d.activity_type || '',
                location: d.location || '', start_time: d.start_time || '', end_time: d.end_time || '',
                organizer: d.organizer || '', max_participants: d.max_participants || 100,
                current_participants: 0, fee: d.fee || 0, cover_image: null,
                status: 'published', published_at: new Date().toISOString(), created_at: new Date().toISOString()
            });
            saveDB();
            return {code: 0, data: {id: acts[acts.length-1].id}, message: '活动发布成功'};
        }
        if (p.match(/^\/api\/activities\/(\d+)$/) && method === 'DELETE') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            db.activities = getTable('activities').filter(a => a.id !== id);
            saveDB();
            return {code: 0, message: '删除成功'};
        }
        if (p.match(/^\/api\/activities\/(\d+)$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const a = getTable('activities').find(x => x.id === id);
            if (a) { Object.assign(a, body); saveDB(); }
            return {code: 0, message: '更新成功'};
        }

        // --- 安防监控 ---
        if (p === '/api/security/devices' && method === 'GET') {
            return {code: 0, data: getTable('access_control_devices')};
        }
        if (p === '/api/security/access-records' && method === 'GET') {
            return {code: 0, data: getTable('access_records').sort((a,b) => (b.id||0)-(a.id||0))};
        }
        if (p === '/api/security/monitoring-points' && method === 'GET') {
            return {code: 0, data: getTable('monitoring_points')};
        }
        if (p === '/api/security/alerts' && method === 'GET') {
            let rows = getTable('alert_records');
            rows = filterByStatus(rows, queryParams.get('status'));
            rows.sort((a,b) => (b.id||0)-(a.id||0));
            return {code: 0, data: rows};
        }
        if (p.match(/^\/api\/security\/alerts\/(\d+)\/handle$/) && method === 'PUT') {
            const id = parseInt(p.match(/(\d+)/)[1]);
            const alert = getTable('alert_records').find(a => a.id === id);
            if (alert) {
                alert.status = 'handled';
                alert.handler_name = body.handler_name || '管理员';
                alert.handle_result = body.handle_result || '已处理';
                alert.handle_time = new Date().toISOString();
                saveDB();
            }
            return {code: 0, message: '处理完成'};
        }

        // --- 社区医生管理 ---
        // 医生列表
        if (p === '/api/community/doctors' && method === 'GET') {
            let rows = getTable('community_doctors');
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        // 医生详情
        if (p.startsWith('/api/community/doctors/') && method === 'GET') {
            const id = parseInt(p.split('/')[4]);
            const rows = getTable('community_doctors');
            const doctor = rows.find(r => r.id === id);
            if (!doctor) return {code: 404, message: '医生不存在'};
            return {code: 0, data: doctor};
        }
        // 添加医生
        if (p === '/api/community/doctors' && method === 'POST') {
            const data = body;
            const doctors = getTable('community_doctors');
            const newDoc = {
                id: nextId('community_doctors'),
                name: data.name || '', title: data.title || '', dept: data.dept || '',
                hospital: data.hospital || '', avatar: data.avatar || '🏥',
                phone: data.phone || '', specialties: data.specialties || '',
                work_time: data.work_time || '', bio: data.bio || '',
                signing_count: 0, rating: 5.0,
                status: data.status || 'active', work_time: data.work_time || '',
                created_at: new Date().toISOString()
            };
            doctors.push(newDoc);
            saveDB();
            return {code: 0, data: newDoc, message: '添加成功'};
        }
        // 更新医生
        if (p.startsWith('/api/community/doctors/') && method === 'PUT') {
            const id = parseInt(p.split('/')[4]);
            const doctors = getTable('community_doctors');
            const idx = doctors.findIndex(r => r.id === id);
            if (idx === -1) return {code: 404, message: '医生不存在'};
            doctors[idx] = { ...doctors[idx], ...body, id };
            saveDB();
            return {code: 0, data: doctors[idx], message: '更新成功'};
        }
        // 删除医生
        if (p.startsWith('/api/community/doctors/') && method === 'DELETE') {
            const id = parseInt(p.split('/')[4]);
            const doctors = getTable('community_doctors');
            const idx = doctors.findIndex(r => r.id === id);
            if (idx === -1) return {code: 404, message: '医生不存在'};
            doctors.splice(idx, 1);
            saveDB();
            return {code: 0, message: '删除成功'};
        }
        // 签约记录
        if (p === '/api/community/signings' && method === 'GET') {
            let rows = getTable('doctor_signings');
            const status = queryParams.get('status');
            rows = filterByStatus(rows, status);
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        if (p === '/api/community/signings' && method === 'POST') {
            const data = body;
            const signings = getTable('doctor_signings');
            const newSign = {
                id: nextId('doctor_signings'),
                resident_name: data.resident_name || '',
                resident_phone: data.resident_phone || '',
                doctor_id: data.doctor_id || 0,
                doctor_name: data.doctor_name || '',
                signing_date: data.signing_date || '',
                valid_from: data.valid_from || '',
                valid_until: data.valid_until || '',
                status: data.status || 'active',
                service_package: data.service_package || '基础包',
                remark: data.remark || '',
                created_at: new Date().toISOString()
            };
            signings.push(newSign);
            saveDB();
            return {code: 0, data: newSign, message: '签约成功'};
        }
        if (p.startsWith('/api/community/signings/') && method === 'PUT') {
            const id = parseInt(p.split('/')[4]);
            const signings = getTable('doctor_signings');
            const idx = signings.findIndex(r => r.id === id);
            if (idx === -1) return {code: 404, message: '签约记录不存在'};
            signings[idx] = { ...signings[idx], ...body, id };
            saveDB();
            return {code: 0, data: signings[idx], message: '更新成功'};
        }
        // 随访记录
        if (p === '/api/community/followups' && method === 'GET') {
            let rows = getTable('doctor_followups');
            const status = queryParams.get('status');
            rows = filterByStatus(rows, status);
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        // 健康预警
        if (p === '/api/community/alerts' && method === 'GET') {
            let rows = getTable('health_alerts');
            const status = queryParams.get('status');
            rows = filterByStatus(rows, status);
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        if (p.startsWith('/api/community/alerts/') && p.endsWith('/handle') && method === 'PUT') {
            const id = parseInt(p.split('/')[4]);
            const alerts = getTable('health_alerts');
            const idx = alerts.findIndex(r => r.id === id);
            if (idx === -1) return {code: 404, message: '预警不存在'};
            alerts[idx].status = 'handled';
            alerts[idx].handled_by = body.handled_by || '';
            alerts[idx].handled_note = body.handled_note || '';
            alerts[idx].handled_time = new Date().toISOString();
            saveDB();
            return {code: 0, message: '处理成功'};
        }
        // 在线问诊
        if (p === '/api/community/consultations' && method === 'GET') {
            let rows = getTable('doctor_consultations');
            rows.sort((a,b) => (b.id||0) - (a.id||0));
            return {code: 0, data: rows};
        }
        if (p.startsWith('/api/community/consultations/') && p.endsWith('/reply') && method === 'PUT') {
            const id = parseInt(p.split('/')[4]);
            const consultations = getTable('doctor_consultations');
            const idx = consultations.findIndex(r => r.id === id);
            if (idx === -1) return {code: 404, message: '问诊不存在'};
            consultations[idx].doctor_reply = body.doctor_reply || '';
            consultations[idx].status = 'replied';
            consultations[idx].replied_at = new Date().toISOString();
            saveDB();
            return {code: 0, message: '回复成功'};
        }

        console.warn('[Mock API] Unknown endpoint:', method, p);
        return {code: 1, message: 'API not found'};
    }

    // ============ 统计计算 ============
    function getStats() {
        const hk = getTable('housekeeping_orders');
        const ctO = getTable('canteen_orders');
        const ctD = getTable('canteen_dishes');
        const pf = getTable('property_fees');
        const rp = getTable('repair_orders');
        const vt = getTable('visitor_records');
        const an = getTable('announcements');
        const pk = getTable('parking_spaces');
        const hr = getTable('health_records');
        const sos = getTable('sos_records');
        const cp = getTable('care_plans');
        const ac = getTable('activities');
        const dev = getTable('access_control_devices');
        const al = getTable('alert_records');

        const hkCompleted = hk.filter(o => o.status === 'completed');
        const hkPending = hk.filter(o => ['pending','accepted','processing'].includes(o.status));
        const ctCompleted = ctO.filter(o => o.status === 'completed');
        const pfPaid = pf.filter(f => f.status === 'paid');
        const rpPending = rp.filter(o => ['pending','assigned','processing'].includes(o.status));

        return {code: 0, data: {
            housekeeping: {
                total_orders: hk.length, completed_orders: hkCompleted.length,
                pending_orders: hkPending.length,
                avg_rating: hkCompleted.length > 0 ? +(hkCompleted.reduce((s,o) => s + (o.rating||0), 0) / hkCompleted.length).toFixed(1) : 0
            },
            canteen: {
                today_orders: ctO.filter(o => o.created_at && o.created_at.startsWith(new Date().toISOString().split('T')[0])).length || 5,
                total_orders: ctO.length, total_dishes: ctD.length,
                revenue: ctCompleted.reduce((s,o) => s + (o.amount||0), 0),
                good_rate: ctO.length > 0 ? +(ctCompleted.length / ctO.length * 100).toFixed(1) : 0
            },
            property: { unpaid_fees: pf.filter(f => f.status === 'unpaid').length, paid_amount: pfPaid.reduce((s,f) => s + (f.paid_amount||0) || (f.amount||0), 0) },
            repair: { pending_repairs: rpPending.length, total_repairs: rp.length },
            visitor: { inside_visitors: vt.filter(v => v.status === 'inside').length },
            announcement: { total: an.length, urgent: an.filter(a => a.is_urgent === 1 || a.is_urgent === '1').length },
            parking: { total_spaces: pk.length, occupied_spaces: pk.filter(p => p.status === 'occupied').length },
            health: { abnormal_health: hr.filter(h => h.is_abnormal === 1 || h.is_abnormal === '1').length, pending_sos: sos.filter(s => s.status === 'pending').length, active_care: cp.filter(c => c.status === 'active').length },
            activity: { total: ac.length },
            security: { online_devices: dev.filter(d => d.status === 'online').length, pending_alerts: al.filter(a => a.status === 'pending').length }
        }};
    }

    function getSnapshot() {
        const hk = getTable('housekeeping_orders');
        const rp = getTable('repair_orders');
        const sos = getTable('sos_records');
        const an = getTable('announcements');
        const ctO = getTable('canteen_orders');
        const today = new Date().toISOString().split('T')[0];

        return {code: 0, data: {
            pending_orders: hk.filter(o => ['pending','accepted','processing'].includes(o.status)).length,
            pending_repairs: rp.filter(o => ['pending','assigned','processing'].includes(o.status)).length,
            pending_sos: sos.filter(s => s.status === 'pending').length,
            pending_canteen: ctO.filter(o => o.status === 'pending').length,
            unread_messages: an.filter(a => a.created_at && a.created_at.startsWith(today)).length || 2,
            timestamp: new Date().toISOString()
        }};
    }

    // ============ Fetch 拦截 ============
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
        const urlStr = typeof url === 'string' ? url : url.url;
        const method = (options.method || 'GET').toUpperCase();

        // 只拦截 /api/ 路径
        if (!urlStr.includes('/api/')) {
            return originalFetch.apply(this, arguments);
        }

        // 解析 URL
        let pathname, searchParams;
        try {
            const u = new URL(urlStr, window.location.origin);
            pathname = u.pathname;
            searchParams = u.searchParams;
        } catch(e) {
            return originalFetch.apply(this, arguments);
        }

        // 解析 body
        let body = {};
        if (options.body) {
            try { body = JSON.parse(options.body); } catch(e) {}
        }

        const result = handleAPI(pathname, method, body, searchParams);

        // 模拟网络延迟
        const delay = 50 + Math.random() * 150;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ok: true, status: 200,
                    json: () => Promise.resolve(result),
                    text: () => Promise.resolve(JSON.stringify(result)),
                    clone: function() { return this; }
                });
            }, delay);
        });
    };

    // 初始化
    initDB();
    console.log('[Mock API] 已就绪，拦截 /api/* 请求，数据持久化到 localStorage');

    // ============ 跨标签页数据同步 ============
    // 记录变更前的快照，用于检测变化
    let _prevSnapshot = null;

    function _getSnapshot() {
        const tables = ['housekeeping_orders', 'canteen_orders', 'property_fees',
            'repair_orders', 'sos_records', 'parking_records', 'announcements',
            'visitor_records', 'alert_records', 'care_plans', 'activities',
            'community_doctors', 'doctor_signings', 'doctor_followups',
            'health_assessments', 'health_alerts', 'doctor_consultations'];
        const snap = {};
        tables.forEach(t => {
            const rows = db[t] || [];
            snap[t] = rows.length;
        });
        // 按状态计数
        snap['hk_pending'] = (db['housekeeping_orders'] || []).filter(r => r.status === 'pending').length;
        snap['repair_pending'] = (db['repair_orders'] || []).filter(r => r.status === 'pending').length;
        snap['sos_pending'] = (db['sos_records'] || []).filter(r => r.status === 'pending').length;
        snap['ct_pending'] = (db['canteen_orders'] || []).filter(r => r.status === 'pending').length;
        snap['prop_unpaid'] = (db['property_fees'] || []).filter(r => r.status !== 'paid').length;
        return snap;
    }

    // 初始化时记录快照
    _prevSnapshot = _getSnapshot();

    // 每次保存后检测变化并派发事件
    const _origSaveDB = saveDB;
    saveDB = function() {
        _origSaveDB();
        const now = _getSnapshot();
        const changes = [];

        if (now.hk_pending > _prevSnapshot.hk_pending)
            changes.push({type:'new-order', title:'新家政订单', desc:`+${now.hk_pending - _prevSnapshot.hk_pending} 个待处理订单`, link:'housekeeping-home'});
        if (now.repair_pending > _prevSnapshot.repair_pending)
            changes.push({type:'new-repair', title:'新报修工单', desc:`+${now.repair_pending - _prevSnapshot.repair_pending} 个待处理报修`, link:'repair-home'});
        if (now.sos_pending > _prevSnapshot.sos_pending)
            changes.push({type:'new-sos', title:'SOS紧急呼叫', desc:`+${now.sos_pending - _prevSnapshot.sos_pending} 个SOS待响应`, link:'health-sos'});
        if (now.ct_pending > _prevSnapshot.ct_pending)
            changes.push({type:'new-canteen', title:'新订餐订单', desc:`+${now.ct_pending - _prevSnapshot.ct_pending} 个待确认订餐`, link:'canteen-home'});

        _prevSnapshot = now;
        if (changes.length > 0) {
            window.dispatchEvent(new CustomEvent('data-changed', { detail: { changes } }));
        }
    };

    window.addEventListener('storage', function(e) {
        if (e.key === DB_KEY && e.newValue) {
            console.log('[Mock API] 检测到其他标签页数据变更，正在同步...');
            initDB();
            _prevSnapshot = _getSnapshot(); // 重置快照避免重复通知
            // 派发事件通知页面刷新数据
            window.dispatchEvent(new CustomEvent('db-updated'));
        }
    });
})();

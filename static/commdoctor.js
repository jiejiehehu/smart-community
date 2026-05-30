// ========= 社区医生管理 JS =========
// 使用 index.html 中定义的 api() 和 API_BASE

// ========= 首页概览 =========
async function loadCommDoctorHome() {
    try {
        const [docsRes, signRes, followRes, alertRes] = await Promise.all([
            api('/api/community/doctors'),
            api('/api/community/signings'),
            api('/api/community/followups?status=pending'),
            api('/api/community/alerts?status=pending')
        ]);
        const el1 = document.querySelector('#page-commdoctor-home .overview-cards .overview-card:nth-child(1) h3');
        const el2 = document.querySelector('#page-commdoctor-home .overview-cards .overview-card:nth-child(2) h3');
        const el3 = document.querySelector('#page-commdoctor-home .overview-cards .overview-card:nth-child(3) h3');
        const el4 = document.querySelector('#page-commdoctor-home .overview-cards .overview-card:nth-child(4) h3');
        if (el1 && docsRes.code===0) el1.textContent = docsRes.data.length;
        if (el2 && signRes.code===0) el2.textContent = signRes.data.length;
        if (el3 && followRes.code===0) el3.textContent = followRes.data.length;
        if (el4 && alertRes.code===0) el4.textContent = alertRes.data.length;
    } catch(e) { console.error('loadCommDoctorHome error:', e); }
}

// ========= 1. 医生管理 =========
async function loadCommDoctorList() {
    const tbody = document.getElementById('commdoctor-list-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="8" class="loading">加载中...</td></tr>';
    try {
        const res = await api('/api/community/doctors');
        if (res.code !== 0) { tbody.innerHTML = '<tr><td colspan="8">加载失败</td></tr>'; return; }
        let html = '';
        res.data.forEach(d => {
            html += '<tr>'
                + '<td>' + d.id + '</td>'
                + '<td>' + (d.avatar||'🏥') + ' ' + d.name + '</td>'
                + '<td>' + (d.title||'') + '</td>'
                + '<td>' + (d.dept||'') + '</td>'
                + '<td>' + (d.hospital||'') + '</td>'
                + '<td>' + (d.phone||'') + '</td>'
                + '<td>' + (d.signing_count||0) + '</td>'
                + '<td><button class="btn btn-sm btn-primary" onclick="editCommDoctor(' + d.id + ')">编辑</button> '
                + '<button class="btn btn-sm btn-danger" onclick="deleteCommDoctor(' + d.id + ')">删除</button></td>'
                + '</tr>';
        });
        tbody.innerHTML = html || '<tr><td colspan="8" style="text-align:center;color:#999;">暂无数据</td></tr>';
    } catch(e) { tbody.innerHTML = '<tr><td colspan="8">加载失败</td></tr>'; }
}

function openCommDoctorModal(id) {
    const isEdit = id > 0;
    const title = isEdit ? '编辑医生' : '添加医生';
    let html = '<div class="form-row">'
        + '<div class="form-group"><label>医生姓名</label><input class="form-input" id="cdoc-name"></div>'
        + '<div class="form-group"><label>职称</label><input class="form-input" id="cdoc-title"></div></div>'
        + '<div class="form-row">'
        + '<div class="form-group"><label>科室</label><input class="form-input" id="cdoc-dept"></div>'
        + '<div class="form-group"><label>所属机构</label><input class="form-input" id="cdoc-hospital"></div></div>'
        + '<div class="form-row">'
        + '<div class="form-group"><label>联系电话</label><input class="form-input" id="cdoc-phone"></div>'
        + '<div class="form-group"><label>工作时间</label><input class="form-input" id="cdoc-worktime"></div></div>'
        + '<div class="form-group"><label>擅长领域</label><input class="form-input" id="cdoc-specialties"></div>'
        + '<div class="form-group"><label>个人简介</label><textarea class="form-input" id="cdoc-bio" rows="2"></textarea></div>';
    const buttons = '<button class="btn btn-outline" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="submitCommDoctor(' + (id||0) + ')">确定</button>';
    showModal(title, html, buttons);
    if (isEdit) {
        api('/api/community/doctors/' + id).then(res => {
            if (res.code===0) {
                document.getElementById('cdoc-name').value = res.data.name || '';
                document.getElementById('cdoc-title').value = res.data.title || '';
                document.getElementById('cdoc-dept').value = res.data.dept || '';
                document.getElementById('cdoc-hospital').value = res.data.hospital || '';
                document.getElementById('cdoc-phone').value = res.data.phone || '';
                document.getElementById('cdoc-worktime').value = res.data.work_time || '';
                document.getElementById('cdoc-specialties').value = res.data.specialties || '';
                document.getElementById('cdoc-bio').value = res.data.bio || '';
            }
        });
    }
}

async function submitCommDoctor(id) {
    const data = {
        name: document.getElementById('cdoc-name').value,
        title: document.getElementById('cdoc-title').value,
        dept: document.getElementById('cdoc-dept').value,
        hospital: document.getElementById('cdoc-hospital').value,
        phone: document.getElementById('cdoc-phone').value,
        work_time: document.getElementById('cdoc-worktime').value,
        specialties: document.getElementById('cdoc-specialties').value,
        bio: document.getElementById('cdoc-bio').value,
        status: 'active'
    };
    let res;
    if (id) {
        res = await api('/api/community/doctors/' + id, { method: 'PUT', body: JSON.stringify(data) });
    } else {
        res = await api('/api/community/doctors', { method: 'POST', body: JSON.stringify(data) });
    }
    if (res.code === 0) { closeModal(); showToast(id ? '更新成功' : '添加成功', 'success'); loadCommDoctorList(); }
    else { showToast(res.message || '操作失败', 'error'); }
}

async function deleteCommDoctor(id) {
    if (!confirm('确认删除该医生？')) return;
    const res = await api('/api/community/doctors/' + id, { method: 'DELETE' });
    if (res.code === 0) { showToast('删除成功', 'success'); loadCommDoctorList(); }
    else { showToast(res.message || '删除失败', 'error'); }
}

function editCommDoctor(id) { openCommDoctorModal(id); }

// ========= 2. 签约管理 =========
async function loadCommDoctorSignings() {
    const tbody = document.getElementById('commdoctor-signings-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="9" class="loading">加载中...</td></tr>';
    try {
        const res = await api('/api/community/signings');
        if (res.code !== 0) { tbody.innerHTML = '<tr><td colspan="9">加载失败</td></tr>'; return; }
        let html = '';
        res.data.forEach(s => {
            const st = s.status==='active' ? '<span class="status-badge status-completed">生效中</span>'
                : (s.status==='pending_renewal' ? '<span class="status-badge status-pending">待续签</span>' : s.status);
            html += '<tr>'
                + '<td>' + s.id + '</td>'
                + '<td>' + (s.resident_name||'') + '</td>'
                + '<td>' + (s.resident_phone||'') + '</td>'
                + '<td>' + (s.doctor_name||'') + '</td>'
                + '<td>' + (s.signing_date||'') + '</td>'
                + '<td>' + (s.valid_until||'') + '</td>'
                + '<td>' + (s.service_package||'') + '</td>'
                + '<td>' + st + '</td>'
                + '<td><button class="btn btn-sm btn-primary" onclick="editCommDoctorSigning(' + s.id + ')">编辑</button> '
                + '<button class="btn btn-sm btn-danger" onclick="deleteCommDoctorSigning(' + s.id + ')">删除</button></td>'
                + '</tr>';
        });
        tbody.innerHTML = html || '<tr><td colspan="9" style="text-align:center;color:#999;">暂无数据</td></tr>';
    } catch(e) { tbody.innerHTML = '<tr><td colspan="9">加载失败</td></tr>'; }
}

function openCommDoctorSigningModal(id) {
    const isEdit = id > 0;
    // 加载医生列表
    api('/api/community/doctors').then(dr => {
        let docOpts = '<option value="">请选择医生</option>';
        (dr.data||[]).forEach(d => { docOpts += '<option value="' + d.id + '">' + d.name + ' - ' + d.title + '</option>'; });
        let html = '<div class="form-row">'
            + '<div class="form-group"><label>签约人姓名</label><input class="form-input" id="csig-name"></div>'
            + '<div class="form-group"><label>联系电话</label><input class="form-input" id="csig-phone"></div></div>'
            + '<div class="form-row">'
            + '<div class="form-group"><label>选择医生</label><select class="form-input" id="csig-doctor">' + docOpts + '</select></div>'
            + '<div class="form-group"><label>服务包</label><select class="form-input" id="csig-package"><option value="基础包">基础包（免费）</option><option value="升级包">升级包（¥50/年）</option><option value="尊享包">尊享包（¥200/年）</option></select></div></div>'
            + '<div class="form-row">'
            + '<div class="form-group"><label>生效日期</label><input class="form-input" id="csig-from" type="date"></div>'
            + '<div class="form-group"><label>到期日期</label><input class="form-input" id="csig-until" type="date"></div></div>'
            + '<div class="form-group"><label>备注</label><textarea class="form-input" id="csig-remark" rows="2"></textarea></div>';
        const buttons = '<button class="btn btn-outline" onclick="closeModal()">取消</button><button class="btn btn-primary" onclick="submitCommDoctorSigning(' + (id||0) + ')">确定</button>';
        showModal(isEdit ? '编辑签约' : '新增签约', html, buttons);
        if (isEdit && id) {
            api('/api/community/signings?status=').then(sr => {
                const rec = (sr.data||[]).find(r => r.id == id);
                if (rec) {
                    document.getElementById('csig-name').value = rec.resident_name || '';
                    document.getElementById('csig-phone').value = rec.resident_phone || '';
                    document.getElementById('csig-doctor').value = rec.doctor_id || '';
                    document.getElementById('csig-package').value = rec.service_package || '基础包';
                    document.getElementById('csig-from').value = rec.valid_from || '';
                    document.getElementById('csig-until').value = rec.valid_until || '';
                    document.getElementById('csig-remark').value = rec.remark || '';
                }
            });
        }
    });
}

async function submitCommDoctorSigning(id) {
    const docSel = document.getElementById('csig-doctor');
    const docName = docSel.selectedOptions[0] ? docSel.selectedOptions[0].text.split(' - ')[0] : '';
    const data = {
        resident_name: document.getElementById('csig-name').value,
        resident_phone: document.getElementById('csig-phone').value,
        doctor_id: parseInt(docSel.value),
        doctor_name: docName,
        service_package: document.getElementById('csig-package').value,
        valid_from: document.getElementById('csig-from').value,
        valid_until: document.getElementById('csig-until').value,
        status: 'active',
        remark: document.getElementById('csig-remark').value
    };
    const res = await api('/api/community/signings', { method: 'POST', body: JSON.stringify(data) });
    if (res.code === 0) { closeModal(); showToast('签约成功', 'success'); loadCommDoctorSignings(); }
    else { showToast(res.message || '操作失败', 'error'); }
}

function editCommDoctorSigning(id) { openCommDoctorSigningModal(id); }
async function deleteCommDoctorSigning(id) {
    if (!confirm('确认删除？')) return;
    const res = await api('/api/community/signings/' + id, { method: 'PUT', body: JSON.stringify({ status: 'cancelled' }) });
    if (res.code === 0) { showToast('已取消', 'success'); loadCommDoctorSignings(); }
}

// ========= 3. 随访管理 =========
async function loadCommDoctorFollowups() {
    const tbody = document.getElementById('commdoctor-followups-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="8" class="loading">加载中...</td></tr>';
    try {
        const res = await api('/api/community/followups');
        if (res.code !== 0) { tbody.innerHTML = '<tr><td colspan="8">加载失败</td></tr>'; return; }
        let html = '';
        res.data.forEach(f => {
            const st = f.status==='completed' ? '<span class="status-badge status-completed">已完成</span>'
                : '<span class="status-badge status-pending">待执行</span>';
            html += '<tr>'
                + '<td>' + f.id + '</td>'
                + '<td>' + (f.doctor_name||'') + '</td>'
                + '<td>' + (f.resident_name||'') + '</td>'
                + '<td>' + (f.followup_date||'') + '</td>'
                + '<td>' + (f.followup_type_name||'') + '</td>'
                + '<td>' + (f.assessment||'-') + '</td>'
                + '<td>' + (f.next_followup||'待定') + '</td>'
                + '<td>' + st + '</td>'
                + '</tr>';
        });
        tbody.innerHTML = html || '<tr><td colspan="8" style="text-align:center;color:#999;">暂无数据</td></tr>';
    } catch(e) { tbody.innerHTML = '<tr><td colspan="8">加载失败</td></tr>'; }
}

// ========= 4. 异常预警 =========
async function loadCommDoctorAlerts() {
    const tbody = document.getElementById('commdoctor-alerts-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="9" class="loading">加载中...</td></tr>';
    try {
        const res = await api('/api/community/alerts');
        if (res.code !== 0) { tbody.innerHTML = '<tr><td colspan="9">加载失败</td></tr>'; return; }
        let html = '';
        res.data.forEach(a => {
            const levelCls = a.alert_level==='danger' ? 'status-danger' : 'status-warning';
            const st = a.status==='handled' ? '<span class="status-badge status-completed">已处理</span>'
                : '<span class="status-badge status-pending">待处理</span>';
            html += '<tr>'
                + '<td>' + a.id + '</td>'
                + '<td>' + (a.alert_level_name||'') + ' ' + (a.alert_type||'') + '</td>'
                + '<td>' + (a.resident_name||'') + '</td>'
                + '<td>' + (a.measurement||'') + '</td>'
                + '<td>' + (a.threshold||'') + '</td>'
                + '<td>' + (a.alert_time||'') + '</td>'
                + '<td><span class="status-badge ' + levelCls + '">' + a.alert_level_name + '</span></td>'
                + '<td>' + st + '</td>'
                + '<td>' + (a.status==='handled' ? '<span class="btn btn-sm btn-outline">已处理</span>' : '<button class="btn btn-sm btn-primary" onclick="handleCommDoctorAlert(' + a.id + ')">处理</button>') + '</td>'
                + '</tr>';
        });
        tbody.innerHTML = html || '<tr><td colspan="9" style="text-align:center;color:#999;">暂无预警</td></tr>';
    } catch(e) { tbody.innerHTML = '<tr><td colspan="9">加载失败</td></tr>'; }
}

async function handleCommDoctorAlert(id) {
    const note = prompt('请输入处理备注：');
    if (note === null) return;
    const res = await api('/api/community/alerts/' + id + '/handle', {
        method: 'PUT',
        body: JSON.stringify({ handled_by: '管理员', handled_note: note })
    });
    if (res.code === 0) { showToast('处理成功', 'success'); loadCommDoctorAlerts(); }
    else { showToast(res.message || '操作失败', 'error'); }
}

// ========= 5. 在线问诊 =========
async function loadCommDoctorConsults() {
    const tbody = document.getElementById('commdoctor-consults-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="8" class="loading">加载中...</td></tr>';
    try {
        const res = await api('/api/community/consultations');
        if (res.code !== 0) { tbody.innerHTML = '<tr><td colspan="8">加载失败</td></tr>'; return; }
        let html = '';
        res.data.forEach(c => {
            const st = c.status==='replied' ? '<span class="status-badge status-completed">已回复</span>'
                : '<span class="status-badge status-pending">等待回复</span>';
            html += '<tr>'
                + '<td>' + c.id + '</td>'
                + '<td>' + (c.doctor_name||'') + '</td>'
                + '<td>' + (c.resident_name||'') + '</td>'
                + '<td>' + (c.consult_date||'') + ' ' + (c.consult_time||'') + '</td>'
                + '<td>' + (c.symptom||'') + '</td>'
                + '<td>' + (c.doctor_reply ? c.doctor_reply.substring(0, 40) : '-') + '</td>'
                + '<td>' + st + '</td>'
                + '<td><button class="btn btn-sm btn-primary" onclick="replyCommDoctorConsult(' + c.id + ')">回复</button></td>'
                + '</tr>';
        });
        tbody.innerHTML = html || '<tr><td colspan="8" style="text-align:center;color:#999;">暂无问诊</td></tr>';
    } catch(e) { tbody.innerHTML = '<tr><td colspan="8">加载失败</td></tr>'; }
}

function replyCommDoctorConsult(id) {
    const reply = prompt('请输入回复内容：');
    if (!reply) return;
    api('/api/community/consultations/' + id + '/reply', {
        method: 'PUT',
        body: JSON.stringify({ doctor_reply: reply })
    }).then(res => {
        if (res.code === 0) { showToast('回复成功', 'success'); loadCommDoctorConsults(); }
        else { showToast(res.message || '操作失败', 'error'); }
    });
}

from flask import Blueprint, jsonify, request
from datetime import date
import openpyxl
import os

words_api = Blueprint('words', __name__)


def analyze_file(file_path, dates):
    print("当前要分析的日期:", file_path, dates)
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active
    anasisly_col_index = []
    # 获取需要分析的列
    for row in sheet.iter_rows(min_row=3, max_row=3):
        for cell in row:
            if cell.value is None:
                continue
            if isinstance(cell.value, date):
                date_str = cell.value.strftime("%Y/%m/%d")
                if date_str in dates:
                    anasisly_col_index.append(cell.column)
        # if date_str in date:
        #     # 获取这一列的所有数据
        #     for cell in row:
        #         print(cell.value)
    print(anasisly_col_index)
    for row in sheet.iter_rows(min_row=4, min_col=4, max_col=7):
        # 获取第四列的值
        correct_word = row[0].value
        print("正确答案", correct_word)
        row_data = []
        for cell in row[-2:]:
            if cell.value is not None:
                row_data.append(cell.value)
        if row_data:
            print(row_data)
        # if word is None or word != correct_word:
        #     # 单元格标红色
        #     row[index].fill = openpyxl.styles.PatternFill(
        #         start_color='FF0000', end_color='FF0000', fill_type='solid')
    # wb.save("./upload_file/test.xlsx")


@words_api.route('/words-analysis', methods=['POST'])
def words_analysis():
    response = {}
    data = request.get_json()
    file_name = data['file_name']
    analysis_date = data['analysis_date']
    file_path = os.path.join('./upload_file', file_name)

    try:
        analyze_file(file_path, analysis_date)
        response['ok'] = True
        response['data'] = "解析成功"
    except Exception as e:
        response['ok'] = False
        response['data'] = "解析失败: " + str(e)


    return {
        "ok": True,
        "data": "Hello Flask"
    }


@words_api.route('/upload-file', methods=['POST'])
def upload_file():
    response = {}

    # 检查请求中是否包含文件
    if 'file' not in request.files:
        response['ok'] = False
        response['data'] = "没有文件"
        return jsonify(response), 200

    try:
        file = request.files['file']
        print(file)
        if file:
            filename = file.filename
            file_path = os.path.join('./upload_file', filename)
            file.save(file_path)
        response['ok'] = True
        response['data'] = "上传成功"
    except Exception as e:
        response['ok'] = False
        response['data'] = "上传失败: " + str(e)

    return jsonify(response), 200

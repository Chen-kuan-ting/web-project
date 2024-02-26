# 初始化資料庫連線
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
uri = "mongodb+srv://tim:123@tim.tawom7r.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())
db = client.member_system

# 初始化 Flask 伺服器
from flask import *
app = Flask(
    __name__,
    static_folder="public", 
    static_url_path="/" 
)

app.secret_key = "any string but secret"

# 電商首頁
@app.route("/")
def home():
   if "email" in session:
        state = None
        return render_template("home.html", state=state)
   return render_template("home.html")

# 登入路由
@app.route("/login")
def login():
    return render_template("login.html")

# 登入錯誤路由
@app.route("/login_error")
def login_():
    return render_template("login.html", error="帳號或密碼錯誤，請重新輸入!")

# 註冊路由
@app.route("/register")
def register():
    return render_template("register.html")

# 註冊錯誤路由
@app.route("/register_error")
def register_error():
    return render_template("register.html", error="帳號或電子郵件已註冊過，請重新輸入!")

# 購物車(需會員)
@app.route("/cart")
def index():
    if "email" in session:
        collection = db.user
        email = session["email"]
        cartInfo = collection.find_one({
            "email":email
        })
        
        Pants = 0
        sweater = 0
        coat = 0
        shoes = 0
        
        if 'Pants' in cartInfo:
            for size in ['S','M','L','XL']:
                if size in cartInfo['Pants']:
                    Pants += cartInfo['Pants'][size][0]

        if 'sweater' in cartInfo:          
            for size in ['S','M','L','XL']:
                if size in cartInfo['sweater']:
                    sweater += cartInfo['sweater'][size][0]

        if 'coat' in cartInfo:          
            for size in ['S','M','L','XL']:
                if size in cartInfo['coat']:
                    coat += cartInfo['coat'][size][0]

        if 'shoes' in cartInfo:
            for size in ['US-9','US-10','US-11','US-12']:
                if size in cartInfo['shoes']:
                    shoes += cartInfo['shoes'][size][0]
                    
        total = Pants + sweater + coat + shoes
        if total == 0:
            return render_template("cart.html", cartInfo=cartInfo)
        elif total > 0:
            return render_template("cart.html", cartInfo=cartInfo, total=total)
            
    return redirect("/login")

# 新增至購物車
@app.route("/update/<Prodact>/<size>/<price>/<quantity>", methods=["POST"])
def update(Prodact, size, price, quantity):
    if "email" in session:

        size_ = request.form[size]
        price_ = int(request.form[price])
        quantity_ = int(request.form[quantity])
        total = price_ * quantity_

        key_to_update = Prodact + '.' + size_
        new_value = [total, quantity_]

        collection = db.user
        collection.update_one({
            "email":session["email"]
        }, {
            "$set":{
                key_to_update: new_value
            }
        })
        #偵測是否登入會員,這兩個 jsonify 語句用於將成功或失敗的訊息以 JSON 格式回傳給前端
        return jsonify({"success": True})

    else:
        return jsonify({"error": "請先登入會員"})

# 刪除商品
@app.route("/clear/<Prodact>/<size>")
def clear(Prodact, size):
    key_to_update = Prodact + '.' + size
    collection = db.user
    collection.update_one({
        "email":session["email"]
        }, {
            "$unset":{
                key_to_update:''
            }
        })

    cartInfo = collection.find_one({
            "email":session["email"]
            })

    if cartInfo[Prodact] == {}:
        collection.update_one({
                "email":session["email"]
                }, {
                    "$unset":{
                        Prodact:''
                    }
                })
        return redirect("/cart")
    return redirect("/cart")

# 註冊
@app.route("/signup", methods=["POST"]) 
def signup():
    # 從前端接收資料
    address = request.form["address"]
    nickname = request.form["nickname"]
    email = request.form["email"]
    account = request.form["account"]
    password = request.form["password"]
    phone = request.form["phone"]
    # 根據接收到的資料 處理資料庫
    collection = db.user

    # 檢查是否有相同資料
    result = collection.find_one({
        "$or":[
            {"account":account},
            {"email":email}
        ]
    })
    if result != None:
        return redirect("/register_error")
    
    # 把資料放進資料庫
    collection.insert_one({
        "address":address,
        "nickname":nickname,
        "email":email,
        "account":account,
        "password":password,
        "phone" :phone
    })
    return redirect("/login")

# 登入
@app.route("/signin", methods=["POST"]) 
def signin():
    # 從前端取得使用者輸入
    account = request.form["account"]
    password = request.form["password"]
    # 和資料庫做互動
    collection = db.user
    result = collection.find_one({
        "$and":[
            {"account":account},
            {"password":password}
        ]
    })
    if request.form['button'] == 'login':
        # 找不到資料 導回錯誤登入頁面
        if result == None:
            return redirect("/login_error")
        # 登入成功 在session 記錄會員資訊導向首頁
        session["email"] = result["email"]
        return redirect("/")
    
    if request.form['button'] == 'register':
        return redirect("/register")
    

# 登出
@app.route("/signout")
def signout():
    # 移除 session 中的會員資訊
    del session["email"]
    return redirect("/")

# 添加「忘記密碼」頁面的路由
@app.route("/forgot-password", methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')

        # 在資料庫中查找使用者
        user = db.user.find_one({"email": email})

        if user:
            # 在這裡你可以生成一個重設密碼的 token，並將其存儲到資料庫中
            # 同時，你可以發送包含該 token 的郵件給用戶，讓他們進行密碼重設
            # 這裡省略具體的 token 生成和郵件發送邏輯，需要自行實現

            # 在實際應用中，建議使用安全的方式生成 token，例如 Flask-Security 或其它驗證套件
            # 示範中直接使用 email 作為 token，實際應用中應該使用更複雜的方式
            reset_token = email

            # 存儲 reset_token 到資料庫
            db.user.update_one({"email": email}, {"$set": {"reset_token": reset_token}})

            # 將用戶重定向到輸入新密碼的頁面，並將 reset_token 傳遞過去
            return redirect(url_for("reset_password", reset_token=reset_token))
        else:
            # 如果找不到使用者，將錯誤訊息傳遞到模板中
            return render_template("forgot-password.html", error="該電子郵件尚未註冊。")

    return render_template("forgot-password.html")

# 重設密碼頁面的路由
@app.route("/reset-password/<reset_token>", methods=['GET', 'POST'])
def reset_password(reset_token):
    # 在這裡實現重設密碼的相關邏輯
    # 你可以檢查 reset_token 是否有效，以及進行密碼更新的操作
    # 示範中直接將 reset_token 傳遞到模板中，實際應用中需要更複雜的邏輯
    return render_template("reset-password.html", reset_token=reset_token)




app.run(port=3000)






























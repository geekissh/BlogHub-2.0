from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def toDict(self):
        return dict(id=self.id, title=self.title, content=self.content, date=self.date_posted)

    def __repr__(self):
        return f"Post('{self.title}', '{self.content}','{self.date_posted}')"

@app.route('/register', methods=["POST"])
def register():
    input_data = request.get_json()
    user = User.query.filter_by(email=input_data['email']).first()
    if user:
        return jsonify({"error":"Already has account by this email."})
    hashed_password = bcrypt.generate_password_hash(input_data["password"]).decode('utf-8')
    new_user = User(name=input_data["name"], username=input_data["username"], email=input_data["email"], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token)

@app.route('/login', methods=["POST"])
def login():
    input_data = request.get_json()
    user = User.query.filter_by(email=input_data['email']).first()
    if user is None or not bcrypt.check_password_hash(user.password, input_data["password"]):
         return jsonify({"error":"Unauthorized"})
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

@app.route("/post/new", methods=['POST'])
def new_post():
    blog = request.get_json()
    post = Post(title=blog["title"], content=blog["content"], author_id=1)  # For demonstration, assuming user_id 1
    db.session.add(post)
    db.session.commit()
    return jsonify({
        "post_id":post.id,
        "title":post.title,
        "content":post.content
    })

@app.route("/post/<int:post_id>/delete", methods=['POST'])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"success":"Post deleted"})

@app.route("/post/<int:post_id>", methods=['GET'])
def getpost(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify({"post_id":post.id,"title":post.title,"content":post.content})

@app.route("/post/<int:post_id>/update", methods=['POST'])
def update_post(post_id):
    updated_post = request.get_json()
    post = Post.query.get_or_404(post_id)
    post.title = updated_post["title"]
    post.content = updated_post["content"]
    db.session.commit()
    return jsonify({"title":post.title,"content":post.content})

@app.route('/<string:username>/posts')
def getIndividualsPost(username):
    user = User.query.filter_by(username=username).first()
    user_posts = user.posts
    array = []
    for post in user_posts:
        array.append({'title': post.title, 'content': post.content, "id":post.id})
    return jsonify(array)

@app.route("/totalposts")
def getPosts():
    posts = Post.query.order_by(Post.date_posted.desc())
    array = []
    for post in posts:
        user = User.query.filter_by(id=post.user_id).first()
        array.append({'title': post.title, 'id':post.id, 'content': post.content, "username":user.username, "name":user.name,"date":post.date_posted})
    return jsonify(array)

if __name__ == "__main__":
     app.run(debug=True)

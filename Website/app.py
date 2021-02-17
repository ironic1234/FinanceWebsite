from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("main.html")


if __name__ == '__main__':
    app.run(host=os.environ.get("BACKEND_HOST", "172.0.0.1"),port=5000)

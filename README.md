CLONE THE GIT REPO FIRST.. THEN FOLLOW THIS DEETS


### 1 . Setup Frontend (React)

        cd frontend
        npm install
        npm start


Open: [http://localhost:3000](http://localhost:3000)


### 2 . Setup Backend (FastAPI)


        cd ../backend
        python -m venv venv
        venv\Scripts\activate      

        pip install -r requirements.txt
        uvicorn main:app --reload


API runs at: [http://localhost:8000](http://localhost:8000)

Test endpoint:  
➡️ [http://localhost:8000/hello](http://localhost:8000/hello)


## ✍️ Author

Built by [Thiraviya Lingesh](https://github.com/thiraviyalingesh)

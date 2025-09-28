# Students of Tomorrow – Project Contributions

Projects contributed by students and creators from around the world 🌍.
Your project can be a simple webpage, app, or even something hosted on your own server!

```diff
+ Add your own project by creating a folder in src/views/projects/
- Do not update, delete, or edit anyone else’s files
```

---

## 📂 How to Add Your Project

1. Go to:

   ```
   src/views/projects/
   ```

2. Copy the folder named:

   ```
   adheelahmed
   ```

   and **rename it to your own name**.

3. Inside your new folder, you will see 4 files:

   ```
   index.html
   style.css
   script.js
   readme.json
   ```

---

## 📜 About Each File

* **index.html** → Your main webpage (use this if your project is frontend-based).
* **style.css** → Styling for your webpage.
* **script.js** → Any JavaScript logic.
* **readme.json** → ⚠️ This is the most important file. The server reads this file to display your project details.

---

## 🗂️ Example of `readme.json`

```json
{
  "studentName": "Adheel Ahmed C",
  "profession": "👾",
  "projectTitle": "S O T",
  "description": "Sustainability tracking app with real-time carbon footprint analytics and gamification features for environmental awareness.",
  "tools": ["React", "Node.js", "MongoDB", "Python"],
  "isUrl": false
}
```

---

## 🌐 Hosting Options

* If you use the provided `index.html`, `style.css`, and `script.js` files → everything runs inside the project folder.
* You can also add **new files** if needed.
* If your project is hosted elsewhere (for example: a website, AI tool, or API), set the `isUrl` field in your `readme.json` to your domain name:

```json
"isUrl": "https://abcdefg.com"
```

The app will automatically point to your hosted project instead of the local files.

---

## ✅ Rules

```diff
+ Feel free to add your creativity and tools
+ Keep it simple – most students are just starting out
- Do not modify or delete other people’s files
```

---

✨ That’s it! You’re ready to add your project to **Students of Tomorrow** 🚀

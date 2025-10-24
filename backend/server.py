import os
from flask import Flask, request, jsonify
from flask_cors import CORS 
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)
CORS(app)
@app.route("/api/v1/projects/<project_id>/schedule", methods=["POST"])
def schedule_tasks(project_id):
    try:
        data = request.get_json()
        if not data or "tasks" not in data:
            return jsonify({"error": "Missing tasks in request"}), 400

        tasks = data["tasks"]
        if not isinstance(tasks, list):
            return jsonify({"error": "Tasks must be a list"}), 400

        task_map = {t["title"]: t for t in tasks}

        graph = defaultdict(list)
        indegree = defaultdict(int)

        for task in tasks:
            title = task["title"]
            for dep in task.get("dependencies", []):
                if dep not in task_map:
                    return jsonify({"error": f"Dependency '{dep}' not found in tasks"}), 400
                graph[dep].append(title)
                indegree[title] += 1

        queue = [
            t["title"]
            for t in tasks
            if indegree[t["title"]] == 0
        ]

        queue.sort(key=lambda x: (
            datetime.strptime(task_map[x]["dueDate"], "%Y-%m-%d"),
            task_map[x]["estimatedHours"]
        ))

        order = []

        while queue:
            current = queue.pop(0)
            order.append(current)

            for neighbor in graph[current]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

                    queue.sort(key=lambda x: (
                        datetime.strptime(task_map[x]["dueDate"], "%Y-%m-%d"),
                        task_map[x]["estimatedHours"]
                    ))


        if len(order) != len(tasks):
            return jsonify({"error": "Cycle detected in dependencies"}), 400

        return jsonify({
            "projectId": project_id,
            "recommendedOrder": order
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)


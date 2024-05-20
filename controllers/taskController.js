import Task from "../models/taskModel.js";
import AppError from "../utils/appError.js";

export const createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      createdAt: req.body.createdAt,
      owner: req.user._id,
    });
    if (!newTask) {
      return next(new AppError("Cannot Create task", 401));
    }
    res.status(201).json({
      status: "success",
      data: {
        newTask,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      return next(new AppError("Error getting Tasks", 401));
    }
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new AppError("Error getting task", 401));
    }
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const doc = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const task = await Task.findById(req.params.id);
    if (task.owner.toString() !== req.user._id.toString()) {
      return next(new AppError("User not authorized", 403));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const doc = await Task.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No doc found with that ID", 404));
    }
    const task = await Task.findById(req.params.id);

    if (task.owner.toString() !== req.user._id.toString()) {
      return next(new AppError("User not authorized", 403));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

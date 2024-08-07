<?php

namespace App\Controllers;

use App\Models\User;
use CodeIgniter\RESTful\ResourceController;

class Users extends ResourceController
{
    protected $modelName = 'App\Models\User';
    protected $format    = 'json';

    public function index()
    {


        $users = $this->model->findAll();
        return $this->respond($users);
    }

    public function show($id = null)
    {
        $user = $this->model->find($id);
        if ($user) {
            return $this->respond($user);
        }
        return $this->failNotFound('User not found');
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if ($this->model->insert($data)) {
            return $this->respondCreated($data);
        }
        return $this->failValidationErrors($this->model->errors());
    }

    public function update($id = null)
    {
        $model = new User();
        $data = $this->request->getJSON(true);

        // Log the received data for debugging
        log_message('info', 'Update Data: ' . print_r($data, true));

        // Check if data is empty
        if (empty($data)) {
            return $this->fail("No data provided");
        }

        // Ensure ID is provided
        if (!$id) {
            return $this->fail("Invalid ID");
        }

        // Update the data in the model
        if (!$model->update($id, $data)) {
            return $this->fail("Failed to update");
        }

        return $this->respond("User updated successfully");
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id]);
        }
        return $this->failNotFound('User not found');
    }
}

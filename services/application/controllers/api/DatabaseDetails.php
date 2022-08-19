<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/* @author         Akshatha */
class DatabaseDetails extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('DatabaseDetailsModel','database'); //load model
		$this->load->library('unit_test'); // load unit library
    }
    function DatabaseDetails_get()
    {
        $id = $this->get('id');
        $database = $this->database->fetch_all_database(); // fetching all the data of the country
        if ($id === NULL)
        {
            if ($database)
            {
                $this->response($database, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No Country found'
                ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
            }
        }

        $id = (int) $id;
        // Validate the id.
        if ($id <= 0)
        {   // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $database_data = NULL;
        if (!empty($database))
        {
            foreach ($database as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $database_data = $value;
                }
            }
            $this->set_response($database_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Database Details could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    public function DatabaseDetails_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->database->updateDatabaseDetails($data);
        } else {
            $insert = $this->database->addDatabaseDetails($data);
        }
        if ($insert == true) {
            $this->set_response($data, REST_Controller::HTTP_CREATED);
            // CREATED (201) being the HTTP response code
        } else {
            $this->response([
                'status' => false,
                'message' => 'data not inserted',
            ], REST_Controller::HTTP_NO_CONTENT);
        }
    }


}



?>
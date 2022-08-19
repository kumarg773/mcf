<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/* @author         Akshatha */
class Server extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('ServerModel','server'); //load model
		$this->load->library('unit_test'); // load unit library
    }
    function Server_get()
    {
        $id = $this->get('id');
        $server = $this->server->fetch_all_servers(); // fetching all the data of the country
        if ($id === NULL)
        {
            if ($server)
            {
                $this->response($server, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
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

        $server_data = NULL;
        if (!empty($server))
        {
            foreach ($server as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $server_data = $value;
                }
            }
            $this->set_response($server_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Server Details could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    public function Server_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->server->updateServer($data);
        } else {
            $insert = $this->server->addServer($data);
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
<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/* @author         Akshatha */
class ClientDetails extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('ClientDetailsModel','client'); //load model
		$this->load->library('unit_test'); // load unit library
    }
    function Client_get()
    {
        $id = $this->get('id');
        $client = $this->client->fetch_all_client(); // fetching all the data of the country
        if ($client) {
            foreach ($client as $clients) {
                $clients->Product = $this->client->fetchProductDetals($clients->Id);
                $clients->Varient = $this->client->fetchProductVarientDetals($clients->Id);
                $clients->productMap = $this->client->fetch_all_productmap($clients->Id);
                $clients->adminDetails = $this->client->fetch_all_admin($clients->Id);
                $clients->Inventory = $this->client->fetch_all_inventory($clients->Id);
                $clients->Country = $this->client->fetchCountryDetals($clients->Id);
                $clients->State = $this->client->fetchStateDetals($clients->Id);
            }
        }
        if ($id === NULL)
        {
            if ($client)
            {
                $this->response($client, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
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

        $client_data = NULL;
        if (!empty($client))
        {
            foreach ($client as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $client_data = $value;
                }
            }
            $this->set_response($client_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Client Details could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    function Country_get()
    {
        $id = $this->get('id');
        $Country = $this->client->fetch_all_country(); // fetching all the data of the country
        if ($id === NULL)
        {
            if ($Country)
            {
                $this->response($Country, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
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

        $Country_data = NULL;
        if (!empty($Country))
        {
            foreach ($Country as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $Country_data = $value;
                }
            }
            $this->set_response($Country_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Country could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    function State_get()
    {
        $id = $this->get('id');
        $State = $this->client->fetch_all_state(); // fetching all the data of the country
        if ($id === NULL)
        {
            if ($State)
            {
                $this->response($State, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
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

        $State_data = NULL;
        if (!empty($State))
        {
            foreach ($State as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $State_data = $value;
                }
            }
            $this->set_response($State_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Country could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    public function Client_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->client->updateClient($data);
        } else {
            $insert = $this->client->addClients($data);
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
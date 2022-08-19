<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* @author         Akshatha */
class ServerModel extends CI_model
{

	protected $serverFields = [
		"Customer_Type",
		"Server_Name",
		"Server_Path",
		"Client_Id",
		"Active_Status",
		"Login_Id",
		"Password",
		"Server_Instance_Path"
	];
	function __construct()
	{
		parent::__construct();
	}
	public function fetch_all_servers()
	{
		$query = $this->db->get('tb_server_path');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function addServer($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->serverFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->insert('tb_server_path', $values);
		return $this->db->insert_id();
	}

	public function updateServer($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->serverFields)) {
                $values[$key] = $value;
            }
        }
		$this->db->where('Id', $data["Id"]);
        $this->db->update('tb_server_path', $values);
	}
}
?>
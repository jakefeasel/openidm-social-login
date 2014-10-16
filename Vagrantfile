# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define "postgresql93" do |postgresql93|
    postgresql93.vm.provision :shell, :path => "vagrant_scripts/pg93_bootstrap.sh"
    postgresql93.vm.network "private_network", ip: "192.168.50.4"
    postgresql93.vm.network "forwarded_port", guest: 5432, host: 5432 
    postgresql93.vm.box = "hashicorp/precise32"
  end

  config.vm.define "dj" do |dj|
    dj.vm.provision :shell, :path => "vagrant_scripts/dj_bootstrap.sh"
    dj.vm.provision :shell, :run => "always", :inline => "~/opendj/bin/start-ds"
    dj.vm.network "private_network", ip: "192.168.50.5"
    dj.vm.network "forwarded_port", guest: 1389, host: 1389 #DJ ldap
    dj.vm.network "forwarded_port", guest: 1689, host: 1689 #DJ jmx
    dj.vm.network "forwarded_port", guest: 4444, host: 4444 #DJ admin
    dj.vm.box = "hashicorp/precise32"
  end

  config.vm.define "idm", primary: true do |idm|
    idm.vm.provision :shell, :path => "vagrant_scripts/idm_bootstrap.sh"
    idm.vm.provision :shell, :path => "vagrant_scripts/idm_startup.sh", :run => "always"
    idm.vm.network "private_network", ip: "192.168.50.3"
    idm.vm.network "forwarded_port", guest: 8443, host: 18443 #IDM HTTPS
    idm.vm.box = "hashicorp/precise32"
  end

  # Add new virtual machines below to run whatever remote repositories 
  # you would like to use OpenIDM to connect to.

end

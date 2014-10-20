#!/bin/bash

export OPENIDM_OPTS="-Xms128m -Xmx256m"

echo "192.168.50.4 OPENIDM_REPO_HOST" >> /etc/hosts
echo "192.168.50.5 DJ_HOST" >> /etc/hosts

echo "export OPENIDM_OPTS=\"${OPENIDM_OPTS}\"" >> /etc/profile

## Uncomment the following lines to install Oracle JDK instead of openjdk
#apt-get --yes update

#apt-get --yes --force-yes install python-software-properties
#add-apt-repository --yes ppa:webupd8team/java
#add-apt-repository --yes ppa:chris-lea/node.js

#apt-get --yes update

# Uncomment the below line to upgrade all of the system packages. Warning: takes a while
#apt-get --yes upgrade

#echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
#echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections

#apt-get --yes --force-yes install oracle-java7-installer 

# Below is for OpenJDK; comment this line out if you want Oracle JDK
apt-get --yes --force-yes install openjdk-7-jdk

# You will always need the below three lines
apt-get --yes --force-yes install maven npm
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g grunt-cli

# If you want a specific version of OpenIDM that isn't publish on ForgeRock's maven repository,
# uncomment the the below lines and adjust as necessary be sure that the reference in pom.xml
# matches the version you build:

# svn 1.7 is necessary to work with ForgeRock's SVN server
# unfortunately, subversion 1.8 is shipped by default with Ubuntu 14.04
# Therefore, the below necessity in order to install svn 1.7 (so we can checkout DJ)
#wget -q http://launchpadlibrarian.net/153829758/subversion_1.7.9-1%2Bnmu6ubuntu3_amd64.deb
#wget -q http://launchpadlibrarian.net/153829759/libsvn1_1.7.9-1%2Bnmu6ubuntu3_amd64.deb
#wget -q http://launchpadlibrarian.net/160124078/libneon27-gnutls_0.30.0-1ubuntu1_amd64.deb
#wget -q http://launchpadlibrarian.net/176742527/libgnutls26_2.12.23-12ubuntu2.1_amd64.deb
#wget -q http://launchpadlibrarian.net/161116930/libapr1_1.5.0-1_amd64.deb
#wget -q http://launchpadlibrarian.net/159403060/libaprutil1_1.5.3-1_amd64.deb
#wget -q http://mirrors.kernel.org/ubuntu/pool/universe/d/db/libdb5.1_5.1.29-7ubuntu1_amd64.deb
#wget -q http://mirrors.kernel.org/ubuntu/pool/main/s/serf/libserf1_1.1.0-2ubuntu1_amd64.deb

#dpkg -i *.deb

#echo subversion hold | dpkg --set-selections


#apt-get --yes --force-yes install subversion
#cd /tmp
#svn checkout https://svn.forgerock.org/openidm/tags/3.0.0 openidm
#cd openidm
#mvn clean install

cd /vagrant
mvn clean install
npm install
cd target/openidm_project/bin
./create-openidm-rc.sh
cp openidm /etc/init.d

apt-get --yes update

## Uncomment the following lines to install Oracle JDK instead of openjdk
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
apt-get --yes --force-yes install openjdk-7-jdk unzip


# All of these commented-out lines are necessary if the version of OpenDJ 
# you want to build isn't available to download directly from maven.forgerock.org


#apt-get --yes --force-yes install ant

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

#cd /tmp
#svn checkout https://svn.forgerock.org/opendj/tags/2.6.0 opendj
#cd opendj
#./build.sh
#cp build/package/OpenDJ-2.6.0.zip ~vagrant
#cd ~vagrant
#unzip OpenDJ-2.6.0.zip

# If the version of OpenDJ you want is available on maven.forgerock.org, then just download it and unzip
wget -q http://maven.forgerock.org/repo/releases/org/forgerock/opendj/opendj-server/2.6.0/opendj-server-2.6.0.zip
unzip opendj-server-2.6.0.zip

# however you obtained DJ, the next line should be the same:
opendj/setup --cli --propertiesFilePath /vagrant/vagrant_scripts/opendj.properties --acceptLicense --no-prompt --doNotStart



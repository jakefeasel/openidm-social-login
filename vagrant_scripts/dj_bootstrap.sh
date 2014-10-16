apt-get --yes update

apt-get --yes --force-yes install python-software-properties
add-apt-repository --yes ppa:webupd8team/java
add-apt-repository --yes ppa:chris-lea/node.js

apt-get --yes update

echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections

apt-get --yes --force-yes install oracle-java7-installer maven subversion


cd /tmp
svn checkout https://svn.forgerock.org/opendj/tags/2.6.0 opendj
cd opendj
./build.sh
cp build/package/OpenDJ-2.6.0.zip ~
cd ~
unzip OpenDJ-2.6.0.zip
opendj/setup --cli --propertiesFilePath /vagrant/vagrant_scripts/opendj.properties --acceptLicense --no-prompt --doNotStart


